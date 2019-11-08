/* eslint-disable no-undef */
// Gets the profiles stored in LocalStorages
export const getProfiles = () => {
  let profiles = JSON.parse(localStorage.getItem('profiles'));
  return profiles;
};

// Gets the autofill options from localStorage
export const getOptions = () => {
  let options = JSON.parse(localStorage.getItem('options'));
  return options;
};

//Sets the profiles from state to localStorage
export const saveProfiles = profiles => {
  localStorage.setItem('profiles', JSON.stringify(profiles));
};

export const saveOptions = options => {
  localStorage.setItem('options', JSON.stringify(options));
  chrome.storage.local.set({ options: options });
};

// Sets the current profile to be used for autofilling to Chrome's local storage
export const setCurrentProfile = profile => {
  chrome.storage.local.set({ selectedProfile: profile });
};

export const getCurrentProfile = () => {
  return chrome.storage.local.get(['selectedProfile']);
};
