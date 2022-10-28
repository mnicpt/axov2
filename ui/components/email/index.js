import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import defaultStyles from './styles.js';
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register } from '../util.js';
import { getState, setState } from '../../utils/state.js';

const Email = ({ token, prefilled, styles }) => {
  const ref = components['paypal-email'];
  const [ auth, setAuth ] = useState(getState('authenticated') === 'true');
  const [ email, setEmail ] = useState(getState('email') || prefilled);
  const [ loading, setLoading ] = useState(false);

  const authEvent = new CustomEvent('onAuth', {
    bubbles: false,
		cancelable: false,
    detail: {
      authenticated: auth,
      token
    }
  });

  useEffect(() => {
    Object.keys(components).forEach(componentName => {
      if (componentName !== 'paypal-email') {
        components[componentName].dispatchEvent(authEvent);
      }
    });

    return () => {
      Object.keys(components).forEach(componentName => {
        components[componentName].removeEventListener('onAuth', authEvent);
      });
    };
  });

  const onEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setState('email', email);
  };

  const onLogin = async () => {
    setLoading(true);

    const response = await fetch('https://api.ipify.org?format=json');
    const { ip } = await response.json();

    setLoading(false);

    setAuth(true);
    setState('authenticated', true);
    Object.keys(components).forEach(componentName => {
      if (componentName !== 'paypal-email') {
        components[componentName].dispatchEvent(authEvent);
      }
    });
  };

  const onLogout = () => {
    setAuth(false);
    setState('authenticated', false);
    Object.keys(components).forEach(componentName => {
      if (componentName !== 'paypal-email') {
        components[componentName].dispatchEvent(authEvent);
      }
    });
  };
  
  if (loading) {
    return `Authenticating...`;
  }

  return auth
    ? memberTemplate({ email, onLogout, ref }, styles || defaultStyles)
    : guestTemplate({ email, onEmailChange, onLogin, ref }, styles || defaultStyles);
};

register(Email, 'paypal-email', ['authenticated', 'prefilled'], { shadow: true });

export default Email;