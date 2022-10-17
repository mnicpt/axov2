window.Session = (props) => {
    const { clientToken, authToken, onAuth } = props;

    window.document.addEventListener('onAuth', event => {
      onAuth(event.detail);
    });

    return {
      Email: window.Email
    };
};
