$(document).ready(function() {
<<<<<<< HEAD
	console.log('show me your meaty log, please');
	//var back_prices = $('.last-back-cell .bet-button-price').map(function(){return this.innerHTML;}).toArray();
	//var lay_prices = $('.first-lay-cell .bet-button-price').map(function(){return this.innerHTML;}).toArray();
	//var back_size = $('.last-back-cell .bet-button-size').map(function(){return this.innerHTML;}).toArray();
	//var lay_size = $('.first-lay-cell .bet-button-size').map(function(){return this.innerHTML;}).toArray();
	//function loadDoc() {
xhttp.open("GET", "https://www.betfair.com/exchange/plus/#/football/market/1.126000913", true);
  xhttp.send();
  var xhttp, xmlDoc, txt, x, i;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
  if (xhttp.readyState == 4 && xhttp.status == 200) {
    console.log(xhttp.responseXML);
    console.log(xmlDoc);
    txt = "";
    x = xmlDoc.getElementsByClassName('bet-button-price');
    for (i = 0; i < x.length; i++) {
      txt = txt + x[i].childNodes[0].nodeValue + "<br>";
    }
    console.log('txt')
    }
  };
 
//}
	// console.log(back_prices)
	});
=======
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
>>>>>>> origin/master
