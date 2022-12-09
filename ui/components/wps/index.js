import { useEffect, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

import template from './template.js';
import { components, register } from '../util.js';

const PayPalButton = ({ children }) => {
  return template({ children });
};

register(PayPalButton, 'paypal-button', [], { shadow: true });

export default PayPalButton;