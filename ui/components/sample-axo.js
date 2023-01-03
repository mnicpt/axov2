import { useEffect, useRef } from 'preact';

import '@paypal/email-component';
import '@paypal/shipping-component';
import '@paypal/payment-component';

const MerchantPage = ({ token, userEmail }) => {
  const paymentRef = useRef(null);
  const shippingRef = useRef(null);

  const handleShippingAddress = e => {
    const { shippingAddress } = e.detail;
  };

  const handlePaymentNonce = e => {
    const { nonce } = e.detail;
  };

  useEffect(() => {
    shippingRef.addEventListener('PayPalShippingSelected', handleShippingAddress);
    paymentRef.addEventListener('PayPalPaymentSelected', handlePaymentNonce);
    return () => {
      shippingRef.removeEventListener('PayPalShippingSelected', handleShippingAddress);
      paymentRef.addEventListener('PayPalPaymentSelected', handlePaymentNonce);
    };
  }, []);

  return (
    <>
      <h1>PayPal Merchant Page</h1>
      <paypal-email clientToken={token} prefilled={userEmail}></paypal-email>
      <div>
        <input type='checkbox'>Want me to remember you?</input>
      </div>
      <paypal-shipping ref={shippingRef}></paypal-shipping>
      <div>
        <h2>Shipping Options</h2>
      </div>
      <paypal-payment ref={paymentRef}></paypal-payment>
    </>
  );
};

export default MerchantPage;