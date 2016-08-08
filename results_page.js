var port = chrome.runtime.connect({'name':'results_page'});
port.onMessage.addListener(function(msg) {
	alert('I got a message :)')
	console.log(msg);
});

// ## hoarding
	// chrome.runtime.onMessage.addListener(function(message) {console.log(message)})