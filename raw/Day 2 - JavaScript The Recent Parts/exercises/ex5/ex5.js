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
	return new Promise(function(resolve){
		fakeAjax(file,resolve);
	});
}

async function loadFiles(files) {
	const promisesArray = files.map(getFile)

	for (promise of promisesArray) {
		output(await promise)
	}
}

loadFiles(["file1","file2","file3"]);