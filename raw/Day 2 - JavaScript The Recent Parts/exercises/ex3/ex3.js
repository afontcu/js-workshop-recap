function parse (callback) {
	return function(strings,...values) {
		var string = '';

		for (let i = 0; i < strings.length; i++) {
			if (i > 0) {
				string += callback(values[i-1]);
			}

			string += strings[i]
		}

		return string
	}
}

function upperCase(str) {
	return str.toUpperCase()
}

var name = "kyle",
	twitter = "getify",
	classname = "es6 workshop";

console.log(
	parse(upperCase)`Hello ${name} (@${twitter}), welcome to the ${classname}!`
);
