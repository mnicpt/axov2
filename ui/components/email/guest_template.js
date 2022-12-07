import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const guestTemplate = ({ prefilled, onEmailChange, onLogin }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section contenteditable='false'>
      <h1>Email Guest</h1>
      <input id='pp-email' type='text' placeholder='Email' onChange=${onEmailChange} value='${ prefilled }' />
      <br/>
      <button class='continue' onClick=${onLogin}>Next</button>
  </section>
`);

export default guestTemplate;