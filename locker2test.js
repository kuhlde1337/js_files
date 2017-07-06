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
	var testURL = system.args[1];
}

//code to capture XHR header info
var visited = false;
try{	
page.onResourceRequested = function(resource) {
	var match = resource.url;
	if (match != null && match != '') {
		if (match.match(/http:\/\/pixel\.locker2\.com\/image\/.+\.png\?gtmcb=\d+/g)) {
		visited = true;
		}
	}
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
page.open(testURL, function (status) {
	//just some debug information
	if(debug == true) {
		time =Date.now() - time;
		if (status !== 'success') {
			console.log('Failed to load');
		} else {
			page.render("out.png");
			var title = page.evaluate(function () {
				return document.title;
			});
			console.log('Title:', title);
			console.log('Status:', status);
			console.log('Load Time:', time,'ms');
	}}
	
	if(visited == true)
	{
		console.log('XHR Request made to pixel.locker2.com');
	}
	else{
		console.log('Could not find XHR request made to pixel.locker2.com');
	}
	
	phantom.exit();
});