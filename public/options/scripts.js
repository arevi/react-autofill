// Grabbing the latest profiles and options from storage
let profiles = JSON.parse(localStorage.getItem('profiles'));
let options = JSON.parse(localStorage.getItem('options'));

// Grabbing all of our DOMElements we'll be needing to modify later
let nameField = document.getElementsByName('name')[0];
let emailField = document.getElementsByName('email')[0];
let firstNameField = document.getElementsByName('first_name')[0];
let lastNameField = document.getElementsByName('last_name')[0];
let phoneField = document.getElementsByName('phone')[0];
let addressField = document.getElementsByName('address')[0];
let apartmentField = document.getElementsByName('apartment')[0];
let cityField = document.getElementsByName('city')[0];
let stateField = document.getElementsByName('state')[0];
let zipCodeField = document.getElementsByName('zipcode')[0];
let cardNumberField = document.getElementsByName('cardNumber')[0];
let expMonthField = document.getElementsByName('expMonth')[0];
let expYearField = document.getElementsByName('expYear')[0];
let cvvField = document.getElementsByName('cvv')[0];
let countryField = document.getElementsByName('country')[0];

let supremeTermsCheckbox = document.getElementsByName(
  'supreme-terms-checkbox'
)[0];
let supremePaymentCheckbox = document.getElementsByName(
  'supreme-payment-checkbox'
)[0];

let shopifyNavigateCheckbox = document.getElementsByName(
  'shopify-follow-steps-checkbox'
)[0];
let shopifyPaymentCheckbox = document.getElementsByName(
  'shopify-payment-checkbox'
)[0];

let stripeComprehensiveCheckbox = document.getElementsByName(
  'stripe-fill-more-checkbox'
)[0];

// Initializing the necessary fileds to an array, so they can be iterated later for easier manipulation
let fields = [
  nameField,
  emailField,
  firstNameField,
  lastNameField,
  phoneField,
  addressField,
  apartmentField,
  cityField,
  stateField,
  zipCodeField,
  cardNumberField,
  expMonthField,
  expYearField,
  cvvField,
  countryField
];

// Render the table with profiles and initilize the settings from the storage information
window.onload = () => {
  renderTableRows(profiles);
  initializeUI(options);
};

// Initializes all the settings checkboxes based off the previously pulled options
const initializeUI = options => {
  supremeTermsCheckbox.checked = options.supreme.checkTerms;
  supremePaymentCheckbox.checked = options.supreme.processPayment;

  shopifyNavigateCheckbox.checked = options.shopify.navigateSteps;
  shopifyPaymentCheckbox.checked = options.shopify.processPayment;

  stripeComprehensiveCheckbox.checked = options.stripe.comprehensiveFill;
};

// Renders the table rows for profiles and triggers the function to setup row handlers
const renderTableRows = profiles => {
  let profileRowsHTML = '<tr><th>Profile Name</th></tr>';
  console.log(profiles);
  profiles.forEach(profile => {
    profileRowsHTML += `<tr><td>${profile.name}</td></tr>`;
  });

  document.getElementById('profile-table').innerHTML = profileRowsHTML;

  setupRowHandlers();
};

// Adds a click handler to each row allowing it to be selected and manipulated
const setupRowHandlers = () => {
  let table = document.getElementById('profile-table');
  let rows = document.getElementsByTagName('tr');

  for (let index = 1; index < rows.length; index++) {
    let currentRow = table.rows[index];
    currentRow.addEventListener('click', e => {
      fillProfileFields(e.target.innerText);
    });
  }
};

// Fills the DOM elements for profile editing based off of a profile name that's provided
const fillProfileFields = profileName => {
  let profileData = profiles.filter(profile => profile.name === profileName);

  let fields = Object.keys(profileData[0].billing);
  let details = Object.values(profileData[0].billing);

  fields.forEach(field => {
    document.getElementsByName(field)[0].value = details[fields.indexOf(field)];
  });

  document.getElementsByName('name')[0].value = profileName;
};

// Creates a new profile object and pushes it to the profile array, then initilizes the save to storage
const saveProfile = () => {
  let newProfile = {
    id: Math.floor(Math.random() * 100000000),
    name: nameField.value,
    shipping: {
      email: emailField.value,
      first_name: firstNameField.value,
      last_name: lastNameField.value,
      address: addressField.value,
      apartment: apartmentField.value,
      city: cityField.value,
      country: countryField.value,
      state: stateField.value,
      zipcode: zipCodeField.value,
      phone: phoneField.value
    },
    billing: {
      first_name: firstNameField.value,
      last_name: lastNameField.value,
      email: emailField.value,
      phone: phoneField.value,
      address: addressField.value,
      apartment: apartmentField.value,
      city: cityField.value,
      state: stateField.value,
      zipcode: zipCodeField.value,
      cardNumber: cardNumberField.value,
      expMonth: expMonthField.value,
      expYear: expYearField.value,
      cvv: cvvField.value,
      country: countryField.value
    }
  };

  profiles.push(newProfile);
  updateProfileStorage();
};

// Updates the localStorage API for profiles
const updateProfileStorage = () => {
  localStorage.setItem('profiles', JSON.stringify(profiles));
  renderTableRows(profiles);
};

// Deletes a profile from the local profile object, then updates the localStorage profile API
const deleteProfile = profileName => {
  let newProfileData = profiles.filter(profile => profileName !== profile.name);
  profiles = newProfileData;
  updateProfileStorage();
};

// Clears all profile detail DOM elements
const clearFields = () => {
  fields.forEach(field => (field.value = ''));
};

// Updates the localStorage API for options
const updateOptionStorage = () => {
  localStorage.setItem('options', JSON.stringify(options));
};

// Clicks handlers for buttons and all of the associates functions
// These click handlers will cover buttons and checkboxes
// They will be passed a function to execute when being selected
document.getElementById('deleteProfileBtn').addEventListener('click', () => {
  let profileName = prompt('Please enter the profile name to delete:');
  deleteProfile(profileName);
});

document
  .getElementById('saveProfileBtn')
  .addEventListener('click', saveProfile);

document
  .getElementById('clearFieldsBtn')
  .addEventListener('click', clearFields);

supremeTermsCheckbox.addEventListener('click', () => {
  options.supreme.checkTerms = supremeTermsCheckbox.checked;
  updateOptionStorage();
});
supremePaymentCheckbox.addEventListener('click', () => {
  options.supreme.processPayment = supremePaymentCheckbox.checked;
  updateOptionStorage();
});

shopifyNavigateCheckbox.addEventListener('click', () => {
  options.shopify.navigateSteps = shopifyNavigateCheckbox.checked;
  updateOptionStorage();
});
shopifyPaymentCheckbox.addEventListener('click', () => {
  options.shopify.processPayment = shopifyPaymentCheckbox.checked;
  updateOptionStorage();
});

stripeComprehensiveCheckbox.addEventListener('click', () => {
  options.stripe.comprehensiveFill = stripeComprehensiveCheckbox.checked;
  updateOptionStorage();
});
