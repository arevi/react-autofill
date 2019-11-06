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
const setupTriggers = options => {
  if (!options.general.automatic) {
    chrome.extension.onMessage.addListener(function(request) {
      if (request.action === 'autofill') {
        fillContact();
      }
    });
  } else {
    fillContact();
  }
};

const fillContact = () => {
  let contactDetails = profile.shipping;

  let fieldDetails = {
    buyer_first_name: contactDetails.first_name,
    buyer_last_name: contactDetails.last_name,
    buyer_email: contactDetails.email,
    buyer_phone_number: contactDetails.phone
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

  fillShipping(profile.shipping);
};

const fillShipping = shippingDetails => {
  setOption('shipping_country_id', shippingDetails.country);

  let fieldDetails = {
    shipping_address_1: shippingDetails.address,
    shipping_address_2: shippingDetails.apartment,
    shipping_city: shippingDetails.city,
    shipping_zip: shippingDetails.zipcode
  };

  const fields = Object.keys(fieldDetails);

  fields.forEach(field => {
    let pageElement = document.getElementsByName(field)[0];
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
  setOption('shipping_state', shippingDetails.state);
  document.querySelector('[type="submit"]').click();
};

const setOption = (elementName, text) => {
  let element = document.getElementsByName(elementName)[0];
  let optionsArray = Array.apply(null, element.options);

  let option = optionsArray.filter(item => item.innerText === text)[0];

  let index = optionsArray.indexOf(option);

  element.focus();
  element[index].selected = true;
  element.dispatchEvent(new Event('change', { bubbles: true }));
  element.blur();
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
