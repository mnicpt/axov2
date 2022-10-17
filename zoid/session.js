const Email = zoid.create({
    tag: 'pp-email',
    url: `${ window.location.href }/ui/email.htm`,
    dimensions: {
        width: '100%',
        height: '100%'
    },
    attributes: {
        iframe: {
            scrolling: 'no'
        }
    },
    props: {
        authenticated: {
            type: 'boolean',
            required: false
        },
        prefilled: {
            type: 'string',
            required: false
        },
        onAuth: {
            type: 'function',
            required: false,
            value: ({ props }) => props.parent.props.onAuth
        }
    }
});
const Payment = zoid.create({
    tag: 'pp-payment',
    url: `${ window.location.href }/ui/payment.htm`,
    dimensions: {
        width: '100%',
        height: '100%'
    },
    attributes: {
        iframe: {
            scrolling: 'no'
        }
    },
    props: {
        authenticated: {
            type: 'boolean',
            required: false
        },
    }
});
const Shipping = zoid.create({
    tag: 'pp-shipping',
    url: `${ window.location.href }/ui/shipping.htm`,
    dimensions: {
        width: '100%',
        height: '100%'
    },
    attributes: {
        iframe: {
            scrolling: 'no'
        }
    },
    props: {
        authenticated: {
            type: 'boolean',
            required: false
        },
    }
});

const Session = zoid.create({
    tag: 'pp-session',
    children: () => {
        return {
            Email,
            Payment,
            Shipping
        };
    },
    props: {
        userIdToken: {
            type: 'string',
            required: false,
            default: () => ''
        },
        onAuth: {
            type: 'function',
            required: false,
            decorate: ({ props, value }) => {
                return (...args) => {
                    const { authenticated } = args[0] || {};
                    console.log(`authed: ${authenticated}`);
                    if(authenticated !== null) {
                        // notify all children of updated prop, authenticated, so they can re-render if needed
                        window.Email.instances[0].updateProps({
                            authenticated
                        });
                        window.Payment.instances[0].updateProps({
                            authenticated
                        });
                        window.Shipping.instances[0].updateProps({
                            authenticated
                        });
                    }
                    return value({ authenticated });
                };
            }
        }
    }
});

window.Session = Session;
window.Email = Email;
window.Payment = Payment;
window.Shipping = Shipping;
