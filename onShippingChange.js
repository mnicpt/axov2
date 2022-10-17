const fetchTaxAndShippingOptionsForZip = async (postalCode) => {
  const taxAndShippingOptions = {
    11111: {
      taxAmount: '0.065',
      shippingOptions: [
        {
          id: 'SHIP_1234',
          label: 'Free Shipping',
          type: 'SHIPPING',
          selected: true,
          amount: {
            value: '0.00',
            currency_code: 'USD'
          }
        },
        {
          id: 'SHIP_123',
          label: 'Shipping',
          type: 'SHIPPING',
          selected: false,
          amount: {
            value: '20.00',
            currency_code: 'USD'
          }
        },
        {
          id: 'SHIP_124',
          label: 'Overnight',
          type: 'SHIPPING',
          selected: false,
          amount: {
            value: '40.00',
            currency_code: 'USD'
          }
        }
      ]
    }
  };

  return taxAndShippingOptions[postalCode];
};

const updateSelectedShippingOption = (selectedOption) => {
  const shippingOptions = [
    {
      id: 'SHIP_1234',
      label: 'Free Shipping',
      type: 'SHIPPING',
      selected: true,
      amount: {
        value: '0.00',
        currency_code: 'USD'
      }
    },
    {
      id: 'SHIP_123',
      label: 'Shipping',
      type: 'SHIPPING',
      selected: false,
      amount: {
        value: '20.00',
        currency_code: 'USD'
      }
    },
    {
      id: 'SHIP_124',
      label: 'Overnight',
      type: 'SHIPPING',
      selected: false,
      amount: {
        value: '40.00',
        currency_code: 'USD'
      }
    }
  ];

  const updatedOptions = shippingOptions.map((option) => {
    if (option.label !== selectedOption.label) {
      option.selected = false;
    } else {
      option.selected = true;
    }

    return option;
  });

  return updatedOptions;
};

const patchOrder = async (patchQuery) => {
  console.log(`Patching with query: ${JSON.stringify(patchQuery)}`);
  return;
};

// Merchant
const onShippingAddressChange = async (data, actions) => {
  const { taxAmount, shippingOptions } = await fetchTaxAndShippingOptionsForZip(
    data.shipping_address.postal_code
  );
  return actions
    .updateTax({ taxAmount })
    .updateShippingOptions({ shippingOptions })
    .patch();
};

const onShippingOptionsChange = (data, actions) => {
  const shippingOptions = updateSelectedShippingOption(
    data.selected_shipping_option
  );
  return actions.updateShippingOptions({ shippingOptions }).patch();
};

// SDK
const SDKonShippingAddressChange = (data) => {
  console.log(`SDKonShippingAddressChange...`);
  const patchQueries = [];

  const actions = {
    resolve: () => Promise.resolve(),
    reject: () => Promise.reject(),
    updateTax: ({ taxAmount }) => {
      const newAmount = (
        parseFloat(data.amount.value) +
        parseFloat(data.amount.breakdown.item_total.value) +
        parseFloat(data.amount.breakdown.shipping.value) +
        parseFloat(data.amount.breakdown.handling.value) +
        parseFloat(taxAmount)
      ).toFixed(2);

      patchQueries.push({
        op: 'replace', // or 'add' if there are none.
        path: "/purchase_units/@reference_id=='default'/amount",
        value: {
          value: `${newAmount}`,
          currency_code: 'USD',
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: data.amount.breakdown.item_total || '0.00'
            },
            handling: {
              currency_code: 'USD',
              value: data.amount.breakdown.handling || '0.00'
            },
            shipping: {
              currency_code: 'USD',
              value: data.amount.breakdown.shipping.value || '0.00'
            },
            tax_total: {
              currency_code: 'USD',
              value: `${taxAmount}`
            }
          }
        }
      });

      return actions;
    },
    updateShippingOptions: ({ shippingOptions }) => {
      patchQueries.push({
        op: 'replace', // or 'add' if there are none.
        path: "/purchase_units/@reference_id=='default'/shipping/options",
        value: shippingOptions
      });
      return actions;
    },
    updateShippingDiscount: ({ discount }) => {},
    patch: () => {
      return patchOrder(patchQueries);
    },
    query: () => {
      return patchQueries;
    }
  };

  return new Promise((resolve, reject) => {
    return onShippingAddressChange(data, actions)
      .catch(reject)
      .finally(resolve);
  });
};

const SDKonShippingOptionsChange = (data) => {
  console.log(`SDKonShippingOptionsChange...`);
  const patchQueries = [];

  const actions = {
    resolve: Promise.resolve(),
    reject: Promise.reject(),
    updateShippingOptions: ({ shippingOptions }) => {
      patchQueries.push({
        op: 'replace', // or 'add' if there are none.
        path: "/purchase_units/@reference_id=='default'/shipping/options",
        value: shippingOptions
      });
      return actions;
    },
    patch: () => {
      return patchOrder(patchQueries);
    },
    query: () => {
      return patchQueries;
    }
  };

  return new Promise((resolve, reject) => {
    return onShippingOptionsChange(data, actions)
      .catch(reject)
      .finally(resolve);
  });
};

// App
const XonShippingAddressChange = async (data) => {
  console.log(`XonShippingAddressChange...`);
  return new Promise((resolve, reject) => {
    return SDKonShippingAddressChange(data).catch(reject).finally(resolve);
  });
};

const XonShippingOptionsChange = async (data) => {
  console.log(`XonShippingOptionsChange...`);
  return new Promise((resolve, reject) => {
    return SDKonShippingOptionsChange(data).catch(reject).finally(resolve);
  });
};

// App call
const data = {
  amount: {
    currency_code: 'USD',
    value: '200.00',
    breakdown: {
      item_total: {
        currency_code: 'USD',
        value: '180.00'
      },
      shipping: {
        currency_code: 'USD',
        value: '5.00'
      },
      handling: {
        currency_code: 'USD',
        value: '1.00'
      },
      tax_total: {
        currency_code: 'USD',
        value: '20.00'
      }
    }
  },
  shipping_address: {
    city: 'San Jose',
    state: 'CA',
    country_code: 'US',
    postal_code: '11111'
  },
  selected_shipping_option: {
    label: 'Shipping',
    type: 'SHIPPING', // SHIPPING | PICKUP
    amount: {
      value: '20.00',
      currency_code: 'USD'
    }
  }
};
XonShippingAddressChange(data).catch(console.log);
XonShippingOptionsChange(data).catch(console.log);

