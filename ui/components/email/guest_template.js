import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const guestTemplate = ({ email, onEmailChange, onLogin, onLogout }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section>
      <h1>Email Guest</h1>
      <input id='pp-email' type='text' placeholder='Email' onChange=${onEmailChange}value='${ email }' />
      <br/>
      <button class='continue' onClick=${onLogin}>Continue</button>
  </section>
`);

export default guestTemplate;