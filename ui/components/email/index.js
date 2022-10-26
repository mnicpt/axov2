import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import defaultStyles from './styles.js';
import template from './template.js';
import register from '../util.js';

const Email = ({ authenticated, prefilled, styles }) => {
  const [ auth, setAuth ] = useState(authenticated === 'true');

  let authEvent;
  useEffect(() => {
    authEvent = new CustomEvent('onAuth', {
      detail: {
        authenticated: auth
      }
    });
    document.dispatchEvent(authEvent);
  });

  const onLogin = () => {
    setAuth(true);
    document.dispatchEvent(authEvent);
  };

  const onLogout = () => {
    setAuth(false);
    document.dispatchEvent(authEvent);
  };

  return template({ auth, prefilled, onLogin, onLogout }, styles || defaultStyles);
};

register(Email, 'paypal-email', ['authenticated', 'prefilled', 'styles']);

export default Email;