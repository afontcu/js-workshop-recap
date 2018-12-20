function mult (x, y, z) {
	return x * y * z;
}

function recMult (mul, ...args) {
	if (args.length == 0) return mul
	return mul * recMult(...args)
}

function recMultWithLookahead (mul, y, ...args) {
	if (args.length == 0) return mul * y
	return mul * recMult(y, ...args)
}

recMult(3, 4, 5);	// 60

recMult(3, 4, 5, 6);	// Oops!
