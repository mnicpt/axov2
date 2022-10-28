import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const guestTemplate = (styles) => (html`
  <style>
    ${ styles }
  </style>
  <section>
      <h1>Payment Guest</h1>
  </section>
`);

export default guestTemplate;