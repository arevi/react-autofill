// Initializing global variables that will be used later
let profile;
let options;

// Grabs the selected profile Chrome's local storage
chrome.storage.local.get(['selectedProfile'], function(result) {
  profile = result.selectedProfile;

  if (profile.billing.country === 'United States') {
    profile.billing.country = 'USA';
  }
});

// Grabs the options for the supreme website
chrome.storage.local.get(['options'], function(result) {
  options = result.options;
  setupTriggers(options, profile);
});

// Sets up the trigger that will initialize the autofill function
// Can accept either a hotkey or be triggered by pageload
const setupTriggers = (options, profile) => {
  if (!options.general.automatic) {
    chrome.extension.onMessage.addListener(function(request) {
      if (request.action === 'autofill') {
        fill(profile);
      }
    });
  } else {
    fill(profile);
  }
};

// Fills the billing information into the supreme checkout page
// Converts all applicable fields and their corresponding values into a "profileDetails" object
// Iterates over the keys of this object to fill fields with the appropriate values
const fill = profile => {
  let billingDetails = profile.billing;

  const fieldDetails = {
    order_billing_name: `${billingDetails.first_name} ${billingDetails.last_name}`,
    order_email: billingDetails.email,
    order_tel: billingDetails.phone,
    bo: billingDetails.address,
    oba3: billingDetails.apartment,
    order_billing_zip: billingDetails.zipcode,
    order_billing_city: billingDetails.city,
    cnb: billingDetails.cardNumber,
    vval: billingDetails.cvv
  };

  const fields = Object.keys(fieldDetails);

  fields.forEach(field => {
    let pageElement = document.getElementById(field);
    let detail = fieldDetails[field];
    pageElement.focus();

    if (!options.simulateTyping) {
      fillField(pageElement, detail);
    } else {
      typeField(pageElement, detail);
    }

    pageElement.dispatchEvent(new Event('change'));
    pageElement.blur();
  });

  // These page elements cannot be typed, so therefore they are always instantly set
  document.getElementById('order_billing_state').value = billingDetails.state;
  document.getElementById('order_billing_country').value =
    billingDetails.country;
  document.getElementById('credit_card_month').value = billingDetails.expMonth;
  document.getElementById('credit_card_year').value = billingDetails.expYear;

  if (options.supreme.checkTerms) {
    clickTerms();
  }

  if (options.supreme.processPayment) {
    processPayment();
  }
};

const fillField = (field, detail) => {
  field.value = detail;
};

// Function to type out text, one character at a time in an input field
const typeField = (field, detail) => {
  for (let index = 0; index < detail.length; index++) {
    field.value += detail.charAt(index);
  }
};

// Identifies and clicks the "Terms and conditions" button on Supreme's checkout page
const clickTerms = () => {
  document.getElementsByClassName('icheckbox_minimal')[1].click();
};

// Identifies and clicks the "Process Payment" button on Supreme's checkout page
const processPayment = () => {
  document.querySelector('.button, .checkout').click();
};
