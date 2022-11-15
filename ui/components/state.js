import { components } from "./util.js";

const storageAPIEnabled = () => {
  try {
    window.sessionStorage.setItem;
    return true;
  } catch(err) {
    return false;
  }
};

export const getState = (key) => {
  if (storageAPIEnabled()) {
    return window.sessionStorage.getItem(key);
  }
};

export const setState = (key, value) => {
	const eventName = `${key[0].toUpperCase() + key.substring(1)}Changed`;
  const stateChangedEvent = new CustomEvent(eventName, {
    bubbles: false,
    cancelable: true,
    detail: {
      [key]: value
    }
  });
	
	if (storageAPIEnabled()) {
		window.sessionStorage.setItem(key, value);
	}

  Object.keys(components).forEach(componentName => {
		components[componentName].dispatchEvent(stateChangedEvent);
		components[componentName][key] = value;
		if (components[componentName]['compliant'] === 'true') {
			console.log(`Sending message to frame: ${
				JSON.stringify({
					[key]: value
				})
			}`);
			window.postMessage(JSON.stringify({
				[key]: value
			}));
		}
  });
};