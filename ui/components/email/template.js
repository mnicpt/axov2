import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const template = ({ auth, prefilled, onLogin, onLogout }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section>
      <h1>${auth ? 'Email Member' : 'Email Guest'}</h1>
      <input id='pp-email' type='text' placeholder='Email' value='${ prefilled }' />
      <br/>
      <button class='continue ${auth && 'hide'}' onClick=${onLogin}>Continue</button>
      <button class='logout ${!auth && 'hide'}' onClick=${onLogout}>Logout</button>
  </section>
`);

export default template;