import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const memberTemplate = ({ ref }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section ref=${ref}>
      <h1>Payment Member</h1>
  </section>
`);

export default memberTemplate;