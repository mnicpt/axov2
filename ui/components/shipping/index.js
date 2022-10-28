import { useEffect, useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register } from '../util.js';
import { getState, setState } from '../../utils/state.js';

const Shipping = ({ styles }) => {
  const ref = components['paypal-payment'];
  const [auth, setAuth] = useState(getState('authenticated') === 'true');

  useEffect(() => {
    ref.addEventListener("onAuth", function authEvent(e) {
      setAuth(getState('authenticated') === 'true');
    });

    return () => {
      ref.removeEventListener('onAuth', authEvent);
    };
  }, []);

  return auth
    ? memberTemplate({ ref }, styles || defaultStyles)
    : guestTemplate({ ref }, styles || defaultStyles);
};

register(Shipping, "paypal-shipping", ["authenticated"], { shadow: true });

export default Shipping;
