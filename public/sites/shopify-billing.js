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
    chrome.extension.onMessage.addListener(function(
      request,
      sender,
      sendResponse
    ) {
      if (request.action === 'autofill') {
        fillBilling(profile);
      }
    });
  } else {
    fillBilling(profile);
  }
};

// Fills the billing information in the embeded iFrame within the shopify billing screen
// Receives a profile object and converts it to an object, "fieldDetails" that has a "key" of the field name and "value" of the infromation to enter
// Iterates over the keys to fill each corresponding field and value
const fillBilling = profile => {
  let billingDetails = profile.billing;
  const fieldDetails = {
    number: billingDetails.cardNumber,
    name: `${billingDetails.first_name} ${billingDetails.last_name}`,
    expiry: `${billingDetails.expMonth}/${billingDetails.expYear.slice(2)}`,
    verification_value: billingDetails.cvv
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
  InitiateCheckout();
};

// Sends the message to the background script to send a message to the Shopify content script
// This message initiates the submit payment function
const InitiateCheckout = () => {
  chrome.runtime.sendMessage({ action: 'finalizeCheckout' });
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
