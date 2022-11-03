import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import defaultStyles from './styles.js';
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register, getState, setState } from '../util.js';

const Email = ({ clientToken, prefilled, styles }) => {
  const ref = components['paypal-email'];

  const [ authToken, setAuthToken ] = useState(getState(ref, 'authToken'));
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

    // set local state
    setAuthToken(ip);
    // global state, event, dom sync
    setState(ref, 'authToken', ip);
  };

  const onLogout = () => {
    setAuthToken('');
    setState(ref, 'authToken', '');
  };
  
  if (loading) {
    return `Authenticating...`;
  }

  return authToken
    ? memberTemplate({ email, onLogout, ref }, styles || defaultStyles)
    : guestTemplate({ email, onEmailChange, onLogin, ref }, styles || defaultStyles);
};

register(Email, 'paypal-email', ['clientToken', 'prefilled'], { shadow: true });

export default Email;