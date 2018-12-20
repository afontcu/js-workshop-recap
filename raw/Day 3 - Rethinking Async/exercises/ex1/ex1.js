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
// The old-n-busted callback way

function getFile(file) {
	fakeAjax(file,function(text){
		handleResponse(file, text)
	});
}

var responses = {}

function handleResponse (file, text) {
	if (!(file in responses)) {
		responses[file] = text
	}

	var files = ['file1', 'file2', 'file3']

	for (let i=0; i<files.length; i++) {
		console.log('starting loop for file', file, ': ', files[i])
		var currentFile = files[i]
		if (currentFile in responses) {
			if (responses[currentFile] != null) {
				output(responses[currentFile])
				responses[currentFile] = null // "I have already printed that file"
			}
		}
		else return
	}

	output('Complete!')
}


// request all files concurrently
getFile("file1");
getFile("file2");
getFile("file3");
