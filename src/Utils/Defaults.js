// Returns default options
const getDefaultOptions = () => {
  return {
    trigger: 'hotkey',
    entry: 'instant',
    shopify: {
      navigateSteps: true,
      processPayment: false
    },
    supreme: {
      checkTerms: false,
      processPayment: false
    },
    stripe: {
      comprehensiveFill: false
    }
  };
};

// Returns a default test profile
const getTestProfile = () => {
  return {
    id: 0,
    name: 'Test Profile',
    shipping: {
      email: 'TestProfile@gmail.com',
      first_name: 'Test',
      last_name: 'Profile',
      address: '123 Main Street',
      apartment: 'Apartment 1',
      city: 'New York',
      country: 'United States',
      state: 'NY',
      zipcode: '10001',
      phone: '1234567890'
    },
    billing: {
      first_name: 'Test',
      last_name: 'Profile',
      email: 'TestProfile@gmail.com',
      phone: '1234567890',
      address: '123 Main Street',
      apartment: 'Apartment 1',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
      cardNumber: '1234567891234567',
      expMonth: '01',
      expYear: '2020',
      cvv: '123',
      country: 'United States',
      cardType: 'Mastercard'
    }
  };
};

export { getDefaultOptions, getTestProfile };
