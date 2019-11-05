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
  if (options.trigger === 'hotkey') {
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

  const fieldDetails = {
    cardnumber: billingDetails.cardNumber,
    'exp-date': `${billingDetails.expMonth}/${billingDetails.expYear.slice(2)}`,
    cvc: billingDetails.cvv
  };

  if (options.stripe.comprehensiveFill) {
    fieldDetails.postal = billingDetails.zipcode;
  }

  const fields = Object.keys(fieldDetails);

  fields.forEach(field => {
    let pageElement = document.getElementsByName(field)[0];
    if (!pageElement) return;
    let detail = fieldDetails[field];
    pageElement.focus();
    if (options.entry === 'instant') {
      fillField(field, detail);
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
