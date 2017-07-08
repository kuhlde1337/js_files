var debug = true;
var page = require('webpage').create();
var system = require('system');

if (system.args.length == 1)
{
	console.log('Please pass the URL as an argument');
	phantom.exit();
}
else
{
	var inputURL = system.args[1];
}

//code to capture XHR header info
var visited = false;
var myURL;
var testURL;
var count = 0;
try{	
page.onResourceRequested = function(resource) {
	if (visited == true)
	{
		count = count + 1;
		return;
	}
	testURL = resource.url;
	if (!testURL) {}
	else{
		if (testURL.match(/.*pixel\.locker2\.com\/.+/g)) {
		visited = true;
		myURL = testURL;
		}
	}
	count = count + 1;
};
}
catch(e){
	
}
/*
page.onResourceReceived = function(response) {
  if(response.url.match(http:\/\/pixel\.locker2\.com\/image\/.+\.png\?gtmcb=\d+)
  {
	  visited = true;
  }
};
*/	
if(debug == true){
	var time = Date.now();
}
	
//open page to test
page.open(inputURL, function (status) {
	setTimeout(function(){
    //wait
}, 2000);
	//just some debug information
	if(debug == true) {
		time =Date.now() - time;
		if (status !== 'success') {
			console.log('Failed to load');
		} else {
			//page.render("out.png");
			var title = page.evaluate(function () {
				return document.title;
			});
			console.log('Title:', title);
			console.log('Status:', status);
			console.log('Load Time:', time,'ms');
			console.log('XHR Count:', count);
	}}
	
	if(visited == true)
	{
		console.log('XHR made to pixel.locker2.com');
		console.log('Resource:', myURL);
	}
	else{
		console.log('Could not find XHR made to pixel.locker2.com');
	}
	localStorage.clear();
	phantom.exit();
});