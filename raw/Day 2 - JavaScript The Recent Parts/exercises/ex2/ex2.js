var defaults = {
	foo: 0,
	bar: 4,
	bam: {
		qux: 0,
		qam: 14
	}
};

ajax("http://fun.tld",handleResponse);


// *******************************************************

function handleResponse({
	foo = 0,
	bar = 0,
	baz,
	bam: {
		qux,
		qam = 18
	} = {}	
} = {}) {

	checkData({
		foo,
		bar,
		baz,
		bam: {
			qux,
			qam
		},
	});

}

function ajax(url,cb) {
	// fake ajax response:
	cb({
		foo: 2,
		baz: [ 6, 8, 10 ],
		bam: {
			qux: 12
		}
	});
}

function checkData(data) {
	console.log(
		56 === (
			data.foo + // 2
			data.bar + // 0
			data.baz[0] + data.baz[1] + data.baz[2] + // 24
			data.bam.qux + // 12
			data.bam.qam // 18
		)
	);
}
