$(document).ready(function() {

	populateGrid();

  var mediaContainer = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 200
  });

  function storeRssFeeds(feedName, feedURL) {
    if (typeof(Storage) !== "undefined") {

      console.log("Code for localStorage/sessionStorage.");

      $.ajax({
        url: 'https://api.rss2json.com/v1/api.json',
        method: 'GET',
        dataType: 'json',
        data: {
          rss_url: 'http://feeds.bbci.co.uk/news/rss.xml?edition=uk',
          api_key: 'na85pu9s3lpm1j4katsa2elykvajefuqstwgjbdh', // put your api key here
          count: 2
        }
      }).done(function(response) {
        if (response.status != 'ok') {
          throw response.message;
        }

        console.log('====== ' + response.feed.title + ' ======');

        for (var i in response.items) {
          var item = response.items[i];
          console.log(item.title);
        }
      });
    } else {
      // Sorry! No Web Storage support..
    }
  }
  var feedResults = [];

  function populateGrid() {
    if (typeof(Storage) !== "undefined") {
      if (localStorage.getItem("feeds") === null) {
        //Code to handle no Feeds Present
      } else {
        var feeds = JSON.parse(localStorage.getItem("feeds"));
        for (var i in feeds) {
          $.ajax({
            url: 'https://api.rss2json.com/v1/api.json',
            method: 'GET',
            dataType: 'json',
            data: {
              rss_url: feeds[i].feedURL,
              api_key: 'na85pu9s3lpm1j4katsa2elykvajefuqstwgjbdh', // put your api key here
              count: 2
            }
          }).done(function(response) {
            if (response.status != 'ok') {
              throw response.message;
            }
            // console.log('====== ' + response.feed.title + ' ======');
            for (var i in response.items) {
              var item = response.items[i];
              var feed = {};
              feed = {
                'pubDate': item.pubDate,
                'title': response.feed.title,
                'thumbnail': item.thumbnail,
                'link': item.link,
                'description': item.description
              };
              buildGrid(feed);
            }
						$(mediaContainer).masonry('reloadItems');
						$(mediaContainer).masonry('layout');
          });
        }
      }
    } else {
      // Sorry! No Web Storage support..
    }
  }

  function buildGrid(result) {
		var $template = $('#content-card').clone();
		var newItem = $template.prop('content');

		$(newItem).find('.title').text(result.title);
		$(newItem).find('.timestamp').text(result.pubDate);
		if (result.thumbnail) {
			$(newItem).find('.image-link').attr('href', result.link).attr('target', '_blank');
			$(newItem).find('.article-image').attr('src', result.thumbnail).attr('alt', 'BBC News Image').addClass('thumbnail');
		}
		$(newItem).find('.content-copy').text(result.title);
		$(newItem).find('.article_snippet').text(result.description);

		$('.grid').append(newItem)
  }

  function fetchRSS(feedURL, feedResults) {

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
    }).done(function(response) {
      // console.log ("Response Status = ",response.status)
      if (response.status != 'ok') {
        throw response.message;
      }
      // console.log('====== ' + response.feed.title + ' ======');

      // console.log ("Response",response)
      // console.log("Arrive Pub",feedResults);

      for (var i in response.items) {
        feedResults.push(response.items);
        // console.log("Item",item.title);
      }
    });
    // console.log ("leave Pub",feedResults);
    // console.log("date",feedResults);
  }
});
