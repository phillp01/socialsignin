function addFeed2(feedName, feedURL)	{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("feeds") === null) {
			console.log("Nothing there")
			feeds = [];
			localStorage.setItem("feeds", JSON.stringify(feeds));
		}else	{
			var retrievedData = localStorage.getItem("feeds");
			var feeds = JSON.parse(retrievedData);
		}
	}
		feeds.push({'feedName':feedName, 'feedURL':feedURL});
		localStorage.setItem("feeds", JSON.stringify(feeds));
		document.getElementById("subscribed_feeds").innerHTML = populateFeedList2();
}

function removeFeed2(index)	{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("feeds") === null) {
			//code to hande no entries
		}else	{
			console.log ("Removing",index);
			var feeds = JSON.parse(localStorage.getItem("feeds"));
			feeds.splice(index,1);
			localStorage.setItem("feeds", JSON.stringify(feeds));
			document.getElementById("subscribed_feeds").innerHTML = populateFeedList2();
		}
	}
}

function populateFeedList2()	{
	if (typeof(Storage) !== "undefined") {
		if (localStorage.getItem("feeds") === null) {
			//Code to handle Nothing Stored.
		}else	{
			var feeds = JSON.parse(localStorage.getItem("feeds"));
			var feedHTML ='';
			for (var i = 0; i<feeds.length; i++)	{
				feedHTML += "<div class='feed'><i class='fa fa-circle-o' aria-hidden='true'></i><h3 class='feedName'>" + feeds[i].feedName + "</h3><i class='fa fa-times-circle' aria-hidden='true' onclick=(removeFeed2(" + [i] + "))></i></div>";
			}
			return feedHTML;
		}
	}
}