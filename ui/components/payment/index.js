import { useEffect, useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register, getState, setState } from '../util.js';

const Payment = ({ authenticated, styles }) => {
  const ref = components['paypal-payment'];
  const [auth, setAuth] = useState(authenticated === 'true');

  useEffect(() => {
    ref.addEventListener("onAuthenticated", function authEvent(e) {
      const { authenticated } = e.detail;
      setAuth(authenticated);
    });

    return () => {
      ref.removeEventListener('onAuthenticated', authEvent);
    };
  }, []);

  return auth
    ? memberTemplate({ ref }, styles || defaultStyles)
    : guestTemplate({ ref }, styles || defaultStyles);
};

register(Payment, "paypal-payment", ["authenticated"], { shadow: true });

export default Payment;
