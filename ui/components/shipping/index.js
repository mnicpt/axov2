import { useEffect, useState } from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

import defaultStyles from "./styles.js";
import template from "./template.js";
import register from "../util.js";

const Shipping = ({ authenticated, styles }) => {
  const [auth, setAuth] = useState(authenticated === "true");

  useEffect(() => {
    document.addEventListener("onAuth", (e) => {
      const authenticated = e.detail.authenticated;
      setAuth(authenticated);
    });
  });

  return template({ auth }, styles || defaultStyles);
};

register(Shipping, "paypal-shipping", ["authenticated", "styles"]);

export default Shipping;
