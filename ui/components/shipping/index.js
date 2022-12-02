import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { register } from "../util.js";
import { getState } from "../state.js";

const Shipping = ({ authToken, styles }) => {
  const auth = authToken || getState('auth-token');
  return auth
    ? memberTemplate(styles || defaultStyles)
    : guestTemplate(styles || defaultStyles);
};

register(Shipping, "paypal-shipping", ["auth-token"], {
  shadow: true,
});

export default Shipping;
