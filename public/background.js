// Event listener for chrome keyboard shortscuts
// Will send message to content scripts, to initiate autofill
chrome.commands.onCommand.addListener(function(command) {
  if (command === 'autofill') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'autofill' });
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'finalizeCheckout') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'finalizeCheckout' });
    });
  }
});
