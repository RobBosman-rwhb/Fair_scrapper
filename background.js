chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript(null, {file: "jquery-2.1.4.min.js"});
	chrome.tabs.executeScript(null, {file: "content.js"});
	chrome.tabs.insertCSS(null, {file: "main.css"});
});

