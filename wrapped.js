export function Shipping({ address }) {
  const [ address, setAddress ] = useState(address || {});
  return (
    <div>
      { address }
    </div>
  );
}


class ShippingWebComponent extends HTMLElement {
  constructor() {
    super();
    // Do something more
  }

  connectedCallback() {
    // Create a ShadowDOM
    const root = this.attachShadow({ mode: 'closed' });
    const address = root.getAttribute('address');

    // Create a mount element
    const mountPoint = document.createElement('section');
    root.appendChild(mountPoint);

    // You can directly use shadow root as a mount point
    ReactDOM.render(<Shipping address={address} />, mountPoint);
  }
}

customElements.define('paypal-shipping', ShippingWebComponent);