function urlsToAppendRows(urls) {
    function urlToAppendRow(url) {
        $.get(url, function(data) {
            response = $(data);
            response = response.find('.sold-property-details');
             
			function process(liObj) {
	 			var name = liObj.childNodes[0].nodeValue.trim();
	  			var val = liObj.childNodes[1].innerText.replace(/(?!,)\D/g,'');
	  			// if(name == 'Antal rum') {
	  			// 	console.log([name, val, liObj.childNodes[1].innerText]);
	  			// }
	  			
	  			return [name, val];
			}
		
			var name = response.find('h1').text() 
			var datesold =  response.find('.metadata time').text();
			var finalprice = response.find('.sold-property-price span').text().replace(/(?!,)\D/g,'');
			
			var intermed = 'confused';
			var startprice = '';
			var selling_stats = response.find('.selling-statistics li');
			selling_stats.each(function(){
				intermed = process($(this)[0])
				if (intermed[0] == 'Begärt pris'){
					startprice = intermed[1];
				}
			})
			
			var rooms = '';
			var avgift = '';
			var area = '';
			var runningcost = '';
			var datebuilt = '';
			var prop_attributes = response.find('.property-attributes li');
			// console.log(prop_attributes);
			prop_attributes.each(function(){
				intermed = process($(this)[0])
				// console.log(intermed);
				if (intermed[0] == 'Antal rum'){
					rooms = intermed[1]; 
				}
				else if (intermed[0] == 'Avgift/månad'){
					avgift = intermed[1];
				}
				else if (intermed[0] == 'Boarea'){
					area = intermed[1];
				}
				else if (intermed[0] == 'Driftskostnad'){
					runningcost = intermed[1];
				}
				else if (intermed[0] == 'Byggår'){
					datebuilt = intermed[1].slice(0,4);
				}
				else {
					console.log(intermed);
				}
			})
 
            var row = $('<tr>');
            row.append($('<td>').text(name));
            row.append($('<td>').text(datesold));
			row.append($('<td>').text(finalprice));
			row.append($('<td>').text(startprice));
			row.append($('<td>').text(rooms));
			row.append($('<td>').text(avgift));
			row.append($('<td>').text(area));
			row.append($('<td>').text(runningcost));
			row.append($('<td>').text(datebuilt));
			row.append($('<td>').text(url));
            $('#myTable').append(row);
        })
    }
 
    for(ii=0; ii<urls.length; ii++) {
        urlToAppendRow(urls[ii]);
        // $(document).ajaxStop();
    }
 
}
 
function pageNumToAppendRows(pageNum){
    var urls;
    if(pageNum==1) {
        urls = $('.item-link-container');
        urlsToAppendRows(urls);
    }else{
        $.get('http://www.hemnet.se/salda/resultat?page='+pageNum, function(data){
            var response = $('<html />').html(data);
            var urls = response.find('.item-link-container');
            urlsToAppendRows(urls);
        })
    }
}
 
 
if($('#myTable').length) {
    $('#myTable').empty();
}else{
    $('html').prepend($('<table id="myTable">'));
}
 
$('#myTable').append('<tr><th>Name</th>' +
					 '<th>Date Sold</th>' +
					 '<th>Final Price</th>' +
					 '<th>Start Price</th>' +
					 '<th>Rooms</th>' +
					 '<th>Avgift</th>' +
					 '<th>Area</th>' +
					 '<th>Running Cost</th>' +
					 '<th>Date Built</th></tr>');
 
// alert($('.pagination a:nth-last-child(2)').text());
//var maxPageNum = $('.pagination a:eq(2)').text();
// alert($('.pagination .button:nth-last(2)').text());

// $.ajaxSetup({
// 	async:false
// });


var maxPageNum = 5;
for(pageNum=1; pageNum<=maxPageNum; pageNum++) {
    // setTimeout(pageNumToAppendRows(pageNum), 1000);
    console.log('in for loop')

    if(pageNum == 1) {
    	pageNumToAppendRows(pageNum);
    }else{
    	$(document).ajaxStop(function() {
	    	console.log('in ajaxStop')
	    	pageNumToAppendRows(pageNum);
	    });
    }
    

}

$(document).ajaxStop(function() {
	alert('finished ajax');
});
