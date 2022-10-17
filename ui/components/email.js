class PPEmail extends PPSession {
  constructor() {
    super();
    
    this.template = document.createElement("template");
    this.template.innerHTML = `
      <style>
        .hide {
            display: none;
        }
      </style>
      <section>
          <h1>Email Guest</h1>
          <input id='email' type='text' placeholder='Email' />
          <br/>
          <button class='continue'>Continue</button>
          <button class='logout hide'>Logout</button>
      </section>
    `;

    this.authToken = this.getAttribute('authToken') || '';
    this.clientToken = this.getAttribute('clientToken') || '';
    this.prefilledEmail = this.getAttribute("prefilledEmail") || "";

    this.shadow = this.attachShadow({ mode: 'closed' });

    this.shadow.appendChild(this.template.content.cloneNode(true));
    this.shadow.querySelector("#email").value = this.prefilledEmail;
  }

  connectedCallback() {
    const continueBtn = this.shadow.querySelector('.continue');
    const logoutBtn = this.shadow.querySelector('.logout');
    const heading = this.shadow.querySelector('h1');

    continueBtn.addEventListener("click", (e) => {
      // call identity
      const onAuthEvent = new CustomEvent('onAuth', {
        bubbles: true,
        composed: true,
        detail: {
          authenticated: true
        }
      });
      window.document.dispatchEvent(onAuthEvent);

      continueBtn.className = 'continue hide';
      logoutBtn.className = 'logout';
      heading.innerText = 'Email Member';
    });
    logoutBtn.addEventListener("click", () => {
      const onAuthEvent = new CustomEvent('onAuth', {
        bubbles: true,
        composed: true,
        detail: {
          authenticated: false
        }
      });
      window.document.dispatchEvent(onAuthEvent);

      continueBtn.className = 'continue';
      logoutBtn.className = 'logout hide';
      heading.innerText = 'Email Guest';
    });
  }

  disconnectedCallback() {
    this.shadow.querySelector('.continue').removeEventListener();
    this.shadow.querySelector('.logout').removeEventListener();
  }
}
window.customElements.define("pp-email", PPEmail);
