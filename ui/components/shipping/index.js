import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register, getState, setState } from "../util.js";

const Shipping = ({ authToken, styles }) => {
  const ref = components["paypal-shipping"];

  useEffect(() => {
    ref.addEventListener("AuthTokenChanged", function authEvent(e) {
      const { authToken } = e.detail;
      ref['auth-token'] = authToken;
    });

    return () => {
      ref.removeEventListener("AuthTokenChanged", authEvent);
    };
  }, []);

  return authToken
    ? memberTemplate({ ref }, styles || defaultStyles)
    : guestTemplate({ ref }, styles || defaultStyles);
};

register(Shipping, "paypal-shipping", ["auth-token"], {
  shadow: true,
});

export default Shipping;
