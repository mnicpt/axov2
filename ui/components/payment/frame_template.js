import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const frameTemplate = () => (html`
  <iframe src="/payment-frame.htm" allowtransparency="true" id="paypal-payment" name="__paypal_email__eyJzZW5kZXIiOnsiZG9tYWluIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwIn0sIm1ldGFEYXRhIjp7IndpbmRvd1JlZiI6eyJ0eXBlIjoiZ2xvYmFsIiwidWlkIjoiem9pZC1wcC1lbWFpbC11aWRfOWZjZGU5OTM0NF9tdGM2bWR1Nm1keSJ9fSwicmVmZXJlbmNlIjp7InR5cGUiOiJ1aWQiLCJ1aWQiOiJ1aWRfYTc5MDUxOTE2MV9tdGM2bWR1Nm1keSJ9fQ__" title="pp_email" scrolling="no" id="uid_9acdf0b359_mtc6mdu6mdy" class="zoid-visible" style="background-color: transparent; border: none;"></iframe>
`);

export default frameTemplate;