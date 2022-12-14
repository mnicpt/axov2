import { h, cloneElement, render, hydrate } from 'https://unpkg.com/preact@latest?module';
import { isSecure, preventSecurityOverrides } from './security.js';

// closures to prevent hackery
const _shadows = new WeakMap();
const _vdoms = new WeakMap();
const _vdomComponents = new WeakMap();

// closure to track all registerd components
export const components = {};
window.components = components;
export const register = (Component, tagName, propNames, options) => {
	function PreactElement() {
		const inst = Reflect.construct(HTMLElement, [], PreactElement);
		_vdomComponents.set(inst, Component);
		_shadows.set(inst, options && options.shadow ? inst.attachShadow({ mode: 'closed' }) : inst);
		// inst._root = options && options.shadow ? inst.attachShadow({ mode: 'closed' }) : inst;
		// _shadows.set(inst, inst._root);
    components[tagName] = inst;
		return inst;
	}

	PreactElement.prototype = Object.create(HTMLElement.prototype);
	PreactElement.prototype.constructor = PreactElement;
	PreactElement.prototype.connectedCallback = connectedCallback;
	PreactElement.prototype.attributeChangedCallback = attributeChangedCallback;
	PreactElement.prototype.disconnectedCallback = disconnectedCallback;

	propNames =
		propNames ||
		Component.observedAttributes ||
		Object.keys(Component.propTypes || {});
	PreactElement.observedAttributes = propNames;

	// security
	propNames.push('contentEditable');
	propNames.push('contenteditable');
	propNames.push('style');

	// Keep DOM properties and Preact props in sync
	propNames.forEach((name) => {
		Object.defineProperty(PreactElement.prototype, name, {
			get() {
        console.debug(`Getting ${ name }.`);
				return _vdoms.get(this).props[name] || this.getAttribute(name);
			},
			set(v) {
				if (name === 'contentEditable' || name === 'contenteditable' || name === 'style') {
					return;
				}
        console.debug(`Setting ${ name } to ${v}.`);
				if (_vdoms.get(this)) {
					this.attributeChangedCallback(name, null, v);
				} else {
					console.debug(`VDOM doesn't exist yet. Setting ${ name } to ${v}.`);
					if (!this._props) this._props = {};
					this._props[name] = v;
					this.connectedCallback();
				}

				// Reflect property changes to attributes if the value is a primitive
				const type = typeof v;
				if (
					v == null ||
					type === 'string' ||
					type === 'boolean' ||
					type === 'number'
				) {
					this.setAttribute(name, v);
				}
			},
		});
	});
  
	console.debug(`Creating web component, ${ tagName } from Preact component.`);
	return customElements.define(
		tagName || Component.tagName || Component.displayName || Component.name,
		PreactElement
	);
};

function ContextProvider(props) {
	this.getChildContext = () => props.context;
	// eslint-disable-next-line no-unused-vars
	const { context, children, ...rest } = props;
	return cloneElement(children, rest);
}

function connectedCallback() {
	console.debug('connectedCallback...');
	preventSecurityOverrides();
	if (!isSecure(this)) {
		console.error('Cannot override attachShadow or attempt to access shadow DOM when using PayPal Web Components.');
		return;
	}
	
	// Obtain a reference to the previous context by pinging the nearest
	// higher up node that was rendered with Preact. If one Preact component
	// higher up receives our ping, it will set the `detail` property of
	// our custom event. This works because events are dispatched
	// synchronously.
	const event = new CustomEvent('_preact', {
		detail: {},
		bubbles: false,
		cancelable: true,
	});
	this.dispatchEvent(event);
	const context = event.detail.context;

	_vdoms.set(this, h(
		ContextProvider,
		{ ...this._props, context },
		toVdom(this, _vdomComponents.get(this))
	));

	(this.hasAttribute('hydrate') ? hydrate : render)(_vdoms.get(this), _shadows.get(this));
}

function toCamelCase(str) {
	return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

function attributeChangedCallback(name, oldValue, newValue) {
	console.debug(`attributeChangedCallback...${oldValue} to ${newValue}`);
	if (!_vdoms.get(this)) return;
	// Attributes use `null` as an empty value whereas `undefined` is more
	// common in pure JS components, especially with default parameters.
	// When calling `node.removeAttribute()` we'll receive `null` as the new
	// value. See issue #50.
	newValue = newValue == null ? undefined : newValue;
	const props = {};
	props[name] = newValue;
	props[toCamelCase(name)] = newValue;
	_vdoms.set(this, cloneElement(_vdoms.get(this), props));

	render(_vdoms.get(this), _shadows.get(this));
}

function disconnectedCallback() {
	console.debug('disconnectedCallback...');
	render((_vdoms.set(this, null)), _shadows.get(this));
}

/**
 * Pass an event listener to each `<slot>` that "forwards" the current
 * context value to the rendered child. The child will trigger a custom
 * event, where will add the context value to. Because events work
 * synchronously, the child can immediately pull of the value right
 * after having fired the event.
 */
function Slot(props, context) {
	const ref = (r) => {
		if (!r) {
			this.ref.removeEventListener('_preact', this._listener);
		} else {
			this.ref = r;
			if (!this._listener) {
				this._listener = (event) => {
					event.stopPropagation();
					event.detail.context = context;
				};
				r.addEventListener('_preact', this._listener);
			}
		}
	};
	return h('slot', { ...props, ref });
}

function toVdom(element, nodeName) {
	console.debug('toVdom...');
	if (element.nodeType === 3) return element.data;
	if (element.nodeType !== 1) return null;
	let children = [],
		props = {},
		i = 0,
		a = element.attributes,
		cn = element.childNodes;
	for (i = a.length; i--; ) {
		if (a[i].name !== 'slot') {
			props[a[i].name] = a[i].value;
			props[toCamelCase(a[i].name)] = a[i].value;
		}
	}

	for (i = cn.length; i--; ) {
		const vnode = toVdom(cn[i], null);
		// Move slots correctly
		const name = cn[i].slot;
		if (name) {
			props[name] = h(Slot, { name }, vnode);
		} else {
			children[i] = vnode;
		}
	}

	return h(nodeName || element.nodeName.toLowerCase(), props, children);
}
