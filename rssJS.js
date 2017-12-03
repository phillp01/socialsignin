
$(document).ready(function() {

		populateGrid();

		$('.grid').masonry({
			// options
			itemSelector: '.grid-item',
			columnWidth: 200
		});
		
		function storeRssFeeds(feedName, feedURL)	{
			if (typeof(Storage) !== "undefined") {
			    
			    console.log ("Code for localStorage/sessionStorage.");

			    $.ajax({
			        url: 'https://api.rss2json.com/v1/api.json',
			        method: 'GET',
			        dataType: 'json',
			        data: {
			            rss_url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk',
			            api_key: 'na85pu9s3lpm1j4katsa2elykvajefuqstwgjbdh', // put your api key here
			            count: 2
			        }
				}).done(function (response) {
			    if(response.status != 'ok'){ throw response.message; }

			    console.log('====== ' + response.feed.title + ' ======');

			    for(var i in response.items){
			        var item = response.items[i];
			        console.log(item.title);
		    	}
				});
			} else {
		    // Sorry! No Web Storage support..
			}
		}
		var feedResults = [];

		function populateGrid()	{
			if (typeof(Storage) !== "undefined") {
				if (localStorage.getItem("feeds") === null) {
			 		//Code to handle no Feeds Present
				}else	{
					var feeds = JSON.parse(localStorage.getItem("feeds"));			
					for (var i in feeds)	{
					    $.ajax({
					        url: 'https://api.rss2json.com/v1/api.json',
					        method: 'GET',
					        dataType: 'json',
					        data: {
					            rss_url: feeds[i].feedURL,
					            api_key: 'na85pu9s3lpm1j4katsa2elykvajefuqstwgjbdh', // put your api key here
					            count: 2
				        }
						}).done(function (response) {
						    if(response.status != 'ok'){ 
						     	throw response.message; 
						    }
								// console.log('====== ' + response.feed.title + ' ======');
							for(var i in response.items){
						        var item = response.items[i];
					            var feed = {};
						        feed = {'pubDate':item.pubDate,'title':response.feed.title,'thumbnail':item.thumbnail,'link':item.link,'description':item.description};
						        feedResults.push(feed);
						        // feedResults[i] = i;
					
		                	}
					    	buildGrid();
						});
					}
				}
			}else {
		    // Sorry! No Web Storage support..
			}
		}


		function buildGrid()	{
			var html = ''
			for (var i = 0 ; i < feedResults.length ; i++)	{
			    html += "<article class='grid-item'><header class='article_header'><h4>" + feedResults[i].title  + "</h4><time>" + feedResults[i].pubDate + "</time></header>"
			    if (feedResults[i].thumbnail)	{
			    	html += "<figure><a href='" + feedResults[i].link + "' target='_blank'><img src='" + feedResults[i].thumbnail + "' alt='BBC News Image' width='360'></a></figure>"
			    }
			    html += "<div class='article_content'><header>" + feedResults[i].title + "</header><div class='article_snippet'>" + feedResults[i].description + "</div></div></article>"
			}
			document.getElementById("grid").innerHTML = html
			$('.grid-item').each(function(i, obj) {
				$(obj).height(function(n,c){
			   		return c+190;
			   	});
			});
		}




		function fetchRSS(feedURL, feedResults)	{

			// console.log ("Fetch RSS Running. URL = " + feedURL + " feedResults = " + feedResults);
			$.ajax({
			    url: 'https://api.rss2json.com/v1/api.json',
			    method: 'GET',
			    dataType: 'json',
			    data: {
			        rss_url: feedURL,
			        api_key: 'na85pu9s3lpm1j4katsa2elykvajefuqstwgjbdh', // put your api key here
			        count: 10
			    }
				}).done(function (response) {
			    	// console.log ("Response Status = ",response.status)
			    	if(response.status != 'ok'){ throw response.message; }
			    	// console.log('====== ' + response.feed.title + ' ======');
			  
			    	// console.log ("Response",response)
			    	// console.log("Arrive Pub",feedResults);
			    	

			    	for(var i in response.items){
			    		feedResults.push(response.items);
			    		// console.log("Item",item.title);
			    	}
			});
			// console.log ("leave Pub",feedResults);
			// console.log("date",feedResults);
	}	
});





	// for(var i in response.items){
	//     var item = response.items[i];

	//     html += "<article class='grid-item'><header class='article_header'><h4>" + response.feed.title  + "</h4><time>" + item.pubDate + "</time></header>"
	//     if (item.thumbnail)	{
	//     	html += "<figure><img src='" + item.thumbnail + "' alt='BBC News Image' width='360'></figure>"
	//     	// html += "<figure><a href='" + item.link + "' target='_blank'><img src='" + item.thumbnail + "' alt='BBC News Image' width='360'></a></figure>"
	//     	// html += "<div style='background-image:url(" + item.thumbnail + ");height:200px;'>Some other text</div>";
	//     }
	//     html += "<div class='article_content'><header>" + item.title + "</header><div class='article_snippet'>" + item.description + "</div></div></article>"
	// }

	// document.getElementById("grid").innerHTML = html

	// $('.grid-item').each(function(i, obj) {
	// 	$(obj).height(function(n,c){
	//    		return c+190;
	//    	});
	// });

	// $('.grid').masonry({
	// 	// options
	// 		itemSelector: '.grid-item',
	// 		comlumnWidth: 400,
	// 		gutter: 20
	// });

