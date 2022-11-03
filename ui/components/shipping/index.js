import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import guestTemplate from "./guest_template.js";
import memberTemplate from "./member_template.js";
import { components, register, getState, setState } from "../util.js";

const Shipping = ({ authToken, styles }) => {
  const ref = components["paypal-payment"];
  const [auth, setAuth] = useState(authToken || getState(ref, 'authToken'));

  useEffect(() => {
    ref.addEventListener("authTokenChanged", function authEvent(e) {
      const { authToken } = e.detail;
      setAuth(authToken);
    });

    return () => {
      ref.removeEventListener("authTokenChanged", authEvent);
    };
  }, []);

  return auth
    ? memberTemplate({ ref }, styles || defaultStyles)
    : guestTemplate({ ref }, styles || defaultStyles);
};

register(Shipping, "paypal-shipping", ["authenticated", "authToken"], {
  shadow: true,
});

export default Shipping;
