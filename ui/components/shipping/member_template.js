import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const memberTemplate = (styles) => (html`
  <style>
    ${ styles }
  </style>
  <section>
      <h1>Shipping Member</h1>
  </section>
`);

export default memberTemplate;