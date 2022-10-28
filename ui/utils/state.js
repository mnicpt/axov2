const sessionStorage = window.sessionStorage;

export const getState = (key) => {
  return sessionStorage.getItem(key);
};

export const setState = (key, value) => {
  sessionStorage.setItem(key, value);

  const stateChangedEvent = new CustomEvent('stateChanged', {
    bubbles: true,
    cancelable: true,
    detail: {
      [key]: value
    }
  });

  document.dispatchEvent(stateChangedEvent);
};