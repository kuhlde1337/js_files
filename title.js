var page = require('webpage').create();
page.open('http://www.w3schools.com', function (status) {
	if (status !== 'success') {
		console.log('Failed to load');
	} else {
		var title = page.evaluate(function () {
			return document.title;
		});
		console.log('Title:', title);
	}
	phantom.exit();
});