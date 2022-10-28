import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const guestTemplate = ({ ref }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section ref=${ref}>
      <h1>Payment Guest</h1>
  </section>
`);

export default guestTemplate;