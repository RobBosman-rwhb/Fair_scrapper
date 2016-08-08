$(document).ready(function() {
	console.log('show me your log')
	
	// ## extract values of interest from page	
	var prices = $('.last-back-cell .bet-button-price').map(function(){return this.innerHTML;}).toArray();

	// console.log(prices);

	var port = chrome.runtime.connect({'name':'betfair'});

	port.postMessage({'prices':prices});
});

// ## hoarding
	// var prices = $('.last-back-cell .bet-button-price').contents()[1];

	// chrome.runtime.sendMessage({'sven':'judge me by the content of my script'});
	// chrome.runtime.sendMessage({'sven': chrome.windows.WINDOW_ID_CURRENT});

	// console.log(['the port',port]);