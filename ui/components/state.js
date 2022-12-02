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
	if (storageAPIEnabled()) {
		window.sessionStorage.setItem(key, value);
	}
};