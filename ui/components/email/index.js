import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import defaultStyles from './styles.js';
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register, getState, setState } from '../util.js';

const Email = ({ authenticated, token, prefilled, styles }) => {
  const ref = components['paypal-email'];

  const [ auth, setAuth ] = useState(authenticated);
  const [ email, setEmail ] = useState(prefilled);
  const [ loading, setLoading ] = useState(false);

  const onEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setState(ref, 'prefilled', email);
  };

  const onLogin = async () => {
    setLoading(true);

    const response = await fetch('https://api.ipify.org?format=json');
    const { ip } = await response.json();

    setLoading(false);

    // local state
    setAuth(true);
    // global state, event, dom sync
    setState(ref, 'authenticated', true);
  };

  const onLogout = () => {
    setAuth(false);
    setState(ref, 'authenticated', false);
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