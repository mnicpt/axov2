export const sendEvent = (name, target, data) => {
  if (target.compliant === 'true') {
    console.log(`Sending message to frame: ${
      JSON.stringify(data)
    }`);
    window.postMessage(JSON.stringify(data), '*');
  } else {
    const event = new CustomEvent(name, {
      detail: data,
      bubbles: false,
      cancelable: true,
    });
    target.dispatchEvent(event);
  }
};