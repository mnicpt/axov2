import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register, getState, setState } from "../util.js";

const Shipping = ({ authToken, styles }) => {
  return authToken
    ? memberTemplate(styles || defaultStyles)
    : guestTemplate(styles || defaultStyles);
};

register(Shipping, "paypal-shipping", ["auth-token"], {
  shadow: true,
});

export default Shipping;
