chrome.browserAction.onClicked.addListener(function(tab_betfair) { // no jquery?

	// ## setup both connection listeners and forwarding
	var port_results_page;
	chrome.runtime.onConnect.addListener(function(port) {
		if (port.name == "results_page") {
			port_results_page = port;
		} else if (port.name == "betfair") {
			var port_betfair = port;
			port_betfair.onMessage.addListener(function(msg) {
				port_results_page.postMessage(msg);
			});
		}
	});

	// ## create results_page tab
	chrome.tabs.create({
		'url': chrome.extension.getURL("results_page.html"),
		'windowId':tab_betfair.windowId
	}, function(){

		// ## inject code into content page
		chrome.tabs.executeScript(tab_betfair.id, {file: "jquery-2.1.4.min.js"});
		chrome.tabs.executeScript(tab_betfair.id, {file: "content.js"});
		chrome.tabs.insertCSS(tab_betfair.id, {file: "main.css"});
	});

});

// ## hoarding
	// chrome.runtime.onMessage.addListener(function(message) {console.log(message)});
	// chrome.tabs.message(tab.id, {'fron':'background'});

	// console.log(['the port',port]);

	// port_results_page.postMessage({'msg':'directly from background to results page'});
	// port_betfair.postMessage({'msg':'directly from background to betfair'});


// ## order of events
// background.js starts running
//
// - background.js starts listening for connections from results_page.js
// -- results_page.html is created
//     results_page.js trys to connect to background.js
//      results_page.js starts listening for messages from background.js
//
// - background.js starts listening for connections from content.js
// -- content.js is injected 
//     content.js trys to connect to background.js
//      content.js messages background.js
// --- background.js forwards message to results_page.js
// 