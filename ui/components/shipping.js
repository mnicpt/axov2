class PPShipping extends PPSession {
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
          <h1>Guest Shipping</h1>
      </section>
    `;
    
    this.authToken = this.getAttribute('authToken') || '';
    this.clientToken = this.getAttribute('clientToken') || '';
    
    this.shadow = this.attachShadow({ mode: 'closed' });
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }

  connectedCallback() {
    window.document.addEventListener('onAuth', event => {
      const { authenticated } =  event.detail;
      this.shadow.querySelector('h1').innerText = authenticated === true ? 'Shipping Member' : 'Shipping Guest';
    });
  }

  disconnectedCallback() {
    window.document.removeEventListener();
  }
}
window.customElements.define("pp-shipping", PPShipping);