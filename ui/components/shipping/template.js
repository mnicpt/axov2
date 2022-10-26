import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const template = ({ auth }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section>
      <h1>${auth ? 'Shipping Member' : 'Shipping Guest'}</h1>
  </section>
`);

export default template;