function when(fn) {
	return function(predicate){
		return function(...args){
			if (predicate(...args)) {
				return fn(...args)
			}
		}
	}
}


function isShortEnough(str) {
	return str.length <= 5;
}

const not = fn => (...args) => !fn(...args)

var output = console.log
var printIf = when(output)  // partial application. point-free style of "msg"
var isLongEnough = not(isShortEnough)



var msg1 = "Hello";
var msg2 = msg1 + " World";

printIf(isShortEnough)(msg1);		// Hello
printIf(isShortEnough)(msg2);
printIf(isLongEnough)(msg1);
printIf(isLongEnough)(msg2);		// Hello World

