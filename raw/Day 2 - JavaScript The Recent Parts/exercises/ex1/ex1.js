function foo(a, b, c, ...params) {
	// b = 4
	// c = 6
	return [a, ...params]
}

function bar() {
	var a1 = [ 2, 4 ];
	var a2 = [ 6, 8, 10, 12 ];

	return foo(...a1, ...a2); // 2 4 6 8 10 12
}

console.log(
	bar().join("") === "281012"
);



// object destructuring

var obj = {
	prop: source
}

var {
	prop: target // no és "al revés". prop sempre és a l'esquerra
} = foo()