import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import defaultStyles from './styles.js';
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register } from "../util.js";
import { getState, setState } from "../state.js";

const Email = ({ clientToken, prefilled, styles, onLogin: loginOverride }) => {
  const [ authToken, setAuthToken ] = useState(getState('auth-token') || '');
  const [ loading, setLoading ] = useState(false);

  const onEmailChange = (e) => {
    const email = e.target.value;
    setState('prefilled', email);
  };

  const onLogin = loginOverride
    ? loginOverride
    : async () => {
    setLoading(true);

    const response = await fetch('https://api.ipify.org?format=json');
    const { ip } = await response.json();

    setLoading(false);

    // set local state
    setAuthToken(ip);
    // global state, event, dom sync
    setState('auth-token', ip);
  };

  const onLogout = () => {
    setAuthToken('');
    setState('auth-token', '');
  };
  
  if (loading) {
    return `Authenticating...`;
  }

  return authToken
    ? memberTemplate({ prefilled, onLogout }, styles || defaultStyles)
    : guestTemplate({ prefilled, onEmailChange, onLogin }, styles || defaultStyles);
};

register(Email, 'paypal-email', ['clientToken', 'prefilled', 'onLogin'], { shadow: true });

export default Email;