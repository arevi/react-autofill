// Initializing global variables that will be used later
let profile;
let options;

// Grabs the selected profile Chrome's local storage
chrome.storage.local.get(['selectedProfile'], function(result) {
  profile = result.selectedProfile;
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
        fillBilling(profile);
      }
    });
  } else {
    fillBilling(profile);
  }
};

//Automatically fill out the standard stripe iframe with the users supplied information
const fillBilling = profile => {
  let billingDetails = profile.billing;

  const optionalFields = {
    "[autocomplete='name']": `${billingDetails.first_name} ${billingDetails.last_name}`,
    "[autocomplete='given-name']": billingDetails.first_name,
    "[autocomplete='family-name']": billingDetails.last_name,
    "[autocomplete='tel']": billingDetails.phone,
    "[autocomplete='address-line1']": billingDetails.address,
    "[autocomplete='address-level2']": billingDetails.city,
    "[autocomplete='address-level1']": billingDetails.state,
    "[autocomplete='postal-code']": billingDetails.zipcode,
    "[autocomplete='billing postal-code']": billingDetails.zipcode,
    "[autocomplete='country-name']": billingDetails.country,
    "[autocomplete='ccname']": `${billingDetails.first_name} ${billingDetails.last_name}`,
    "[autocomplete='cc-exp-month']": billingDetails.expMonth,
    "[autocomplete='cc-exp-year']": billingDetails.expYear
  };

  let fieldDetails = {
    "[autocomplete='email']": billingDetails.email,
    "[autocomplete='cc-number']": billingDetails.cardNumber,
    "[autocomplete='cc-exp']": `${
      billingDetails.expMonth
    }/${billingDetails.expYear.slice(2)}`,
    "[autocomplete='cc-csc']": billingDetails.cvv
  };

  if (options.stripe.comprehensiveFill) {
    fieldDetails = { ...fieldDetails, ...optionalFields };
  }

  const fields = Object.keys(fieldDetails);

  fields.forEach(field => {
    let pageElement = document.querySelector(field);
    if (!pageElement) return;
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
};

const fillField = (field, detail) => {
  field.value = detail;
};

// Types a string into a field, one character at a time
const typeField = (field, detail) => {
  for (let index = 0; index < detail.length; index++) {
    field.value += detail.charAt(index);
  }
};
