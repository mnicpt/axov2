import { useEffect, useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import frameTemplate from "./frame_template.js";

import { components, register } from "../util.js";
import { getState, setState } from "../state.js";

const src = '/payment-frame.htm';
const Payment = ({ authToken, compliant, styles }) => {
  return authToken
    ? compliant === 'true' ? frameTemplate({ src }) : memberTemplate(styles || defaultStyles)
    : compliant === 'true' ? frameTemplate({ src }) : guestTemplate(styles || defaultStyles);
};

register(Payment, "paypal-payment", ["auth-token", 'compliant'], { shadow: true });

export default Payment;
