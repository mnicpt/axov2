import { html } from 'https://unpkg.com/htm/preact/index.mjs?module';

const memberTemplate = ({ email, onLogin, onLogout }, styles) => (html`
  <style>
    ${ styles }
  </style>
  <section>
      <h1>Email Member</h1>
      <b>Email: ${ email }</b>
      <br/>
      <div>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <p>Nesciunt harum quibusdam nihil sint maiores, tenetur ipsa illo similique delectus laudantium iure in!</p>
      <p>Ipsa, repellat. Cumque necessitatibus corporis reprehenderit sequi veritatis.</p>
      </div>
      <button class='logout' onClick=${onLogout}>Logout</button>
  </section>
`);

export default memberTemplate;