import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const template = ({ children }) => (html`
  <form action="https://www.paypal.com/cgi-bin/webscr?ap=1" method="post" target="_top">
    ${ children }
  </form>
`);

export default template;