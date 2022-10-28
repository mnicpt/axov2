import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import defaultStyles from './styles.js';
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import register from '../util.js';
import { getState, setState } from '../../utils/state.js';

const Email = ({ token, prefilled, styles }) => {
  const [ auth, setAuth ] = useState(getState('authenticated') === 'true');
  const [ email, setEmail ] = useState(prefilled);

  const authEvent = new CustomEvent('onAuth', {
    bubbles: true,
		cancelable: true,
    detail: {
      authenticated: auth,
      token
    }
  });

  useEffect(() => {
    document.dispatchEvent(authEvent);
    return () => {
      document.removeEventListener('onAuth', authEvent);
    };
  });

  const onEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onLogin = () => {
    setAuth(true);
    setState('authenticated', true);
    document.dispatchEvent(authEvent);
  };

  const onLogout = () => {
    setAuth(false);
    setState('authenticated', false);
    document.dispatchEvent(authEvent);
  };

  return auth
    ? memberTemplate({ email, onLogin, onLogout }, styles || defaultStyles)
    : guestTemplate({ email, onEmailChange, onLogin, onLogout }, styles || defaultStyles);
};

register(Email, 'paypal-email', ['authenticated', 'prefilled'], { shadow: true });

export default Email;