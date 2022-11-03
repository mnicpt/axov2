import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const guestTemplate = ({ prefilled, onEmailChange, onLogin, ref }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section ref=${ref}>
      <h1>Email Guest</h1>
      <input id='pp-email' type='text' placeholder='Email' onChange=${onEmailChange}value='${ prefilled }' />
      <br/>
      <button class='continue' onClick=${onLogin}>Continue</button>
  </section>
`);

export default guestTemplate;