console.log('Working');
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
        fillShipping(profile);
      }
    });
  } else {
    fillShipping(profile);
  }
};

//Automatically fill out the standard stripe iframe with the users supplied information
const fillShipping = profile => {
  let billingDetails = profile.billing;

  let fieldDetails = {
    input_text_firstName: billingDetails.first_name,
    input_text_lastName: billingDetails.last_name,
    input_text_line1: billingDetails.address,
    input_text_line2: billingDetails.apartment,
    input_text_postalCode: billingDetails.zipcode,
    input_text_town: billingDetails.city,
    input_email_email: billingDetails.email,
    input_tel_phone: billingDetails.phone
  };

  const fields = Object.keys(fieldDetails);

  fields.forEach(field => {
    let pageElement = document.getElementById(field);
    if (!pageElement) return;
    let detail = fieldDetails[field];
    pageElement.focus();
    if (!options.simulateTyping) {
      fillField(pageElement, detail);
    } else {
      typeField(pageElement, detail);
    }
    pageElement.dispatchEvent(new Event('change', { bubbles: true }));
    pageElement.blur();
  });

  setOption('select_country', billingDetails.country);

  setOption('select_region', billingDetails.state);
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

const setOption = (elementName, text) => {
  let element = document.getElementById(elementName);
  let selectOptions = element.options;
  let optionsArray = Array.apply(null, selectOptions);

  let option = optionsArray.filter(item => item.innerText === text)[0];

  let index = optionsArray.indexOf(option);
  element.selectedIndex = index;
};
