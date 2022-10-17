window.Email = (props) => {
  const { clientToken, authToken, prefilled } = props;

  return {
    render: (selector) => {
      const PPEmail = document.createElement('pp-email');
      PPEmail.setAttribute('prefilled', prefilled);

      document.querySelector(selector).appendChild(PPEmail);
    }
  };
};