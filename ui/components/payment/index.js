import { useEffect, useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import register from "../util.js";
import { getState, setState } from '../../utils/state.js';

const Payment = ({ styles }) => {
  const [auth, setAuth] = useState(getState('authenticated') === 'true');

  useEffect(() => {
    document.addEventListener("onAuth", (e) => {
      setAuth(getState('authenticated') === 'true');
    });
  }, []);

  return auth
    ? memberTemplate(styles || defaultStyles)
    : guestTemplate(styles || defaultStyles);
};

register(Payment, "paypal-payment", ["authenticated"], { shadow: true });

export default Payment;
