import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const template = ({ auth }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section>
      <h1>${auth ? 'Payment Member' : 'Payment Guest'}</h1>
  </section>
`);

export default template;