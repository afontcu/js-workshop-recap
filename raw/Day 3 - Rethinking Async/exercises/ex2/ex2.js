function fakeAjax(url,cb) {
	var fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function output(text) {
	console.log(text);
}

// **************************************

function getFile(file) {
	var f
	var t

	fakeAjax(file, function callback(text) {
		if (f) f(file)
		else t = file
	})

	return function getThunk(callback) {
		if (t) callback(t)
		else f = callback
	}
}

// request all files concurrently
var th1 = getFile("file1");
var th2 = getFile("file2");
var th3 = getFile("file3");

th1(text => {
	output(text)
	th2(text => {
		output(text)
		th3(text => {
			output(text)
			output("Complete!")
		})
	})
})

