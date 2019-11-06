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
  setupTriggers(options);
});

// Sets up the trigger that will initialize the autofill function
// Can accept either a hotkey or be triggered by pageload
const setupTriggers = options => {
  if (!options.general.automatic) {
    chrome.extension.onMessage.addListener(function(request) {
      if (request.action === 'autofill') {
        identifyStep(document.URL);
      }
    });
  } else {
    identifyStep(document.URL);
  }
};

// Sets up the message listener that will receive a notification when it is time to submit payment
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'finalizeCheckout' && options.shopify.processPayment) {
    finalizeCheckout();
  }
});

// Identifies the step in the checkout process by checking for URL params and
const identifyStep = url => {
  if (url.includes('&step=shipping_method') && options.shopify.navigateSteps) {
    clickNextStep();
  } else {
    fillShipping(profile);
  }
};

// Fills the shipping information page of Shopify checkout, receives a profile and splits it into a fieldDetails object
//fieldDetails object whas a "key" of the field and a "value" of what the field should contain from the profile
// Then iterates over the fields selecting them from the DOM and filling the fields with user options
const fillShipping = profile => {
  let shippingDetails = profile.shipping;

  const fieldDetails = {
    checkout_email: shippingDetails.email,
    checkout_shipping_address_first_name: shippingDetails.first_name,
    checkout_shipping_address_last_name: shippingDetails.last_name,
    checkout_shipping_address_address1: shippingDetails.address,
    checkout_shipping_address_address2: shippingDetails.apartment,
    checkout_shipping_address_city: shippingDetails.city,
    checkout_shipping_address_zip: shippingDetails.zipcode,
    checkout_shipping_address_phone: shippingDetails.phone
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

  document.getElementById('checkout_shipping_address_country').value =
    shippingDetails.country;
  document.getElementById('checkout_shipping_address_province').value =
    shippingDetails.state;

  if (options.shopify.navigateSteps) {
    clickNextStep();
  }
};

// Checks the page for a Google Recaptcha, if present will not automatically click buttons
const checkForRecaptcha = () => {
  if (document.querySelector('.g-recaptcha')) {
    return true;
  }
  return false;
};

const fillField = (field, detail) => {
  field.value = detail;
};

// Takes a field in the DOM and a string, fills in the field one character at a time
const typeField = (field, detail) => {
  for (let index = 0; index < detail.length; index++) {
    field.value += detail.charAt(index);
  }
};

const finalizeCheckout = () => {
  let attemptedCheckout = setTimeout(() => {
    clickNextStep();
    clearTimeout(attemptedCheckout);
  }, 1000);
};

const clickNextStep = () => {
  let continueButton = document.querySelector('.step__footer__continue-btn');
  if (!checkForRecaptcha()) {
    continueButton.click();
  }
};
