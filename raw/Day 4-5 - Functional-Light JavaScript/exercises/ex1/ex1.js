function foo (x) {
	y++;
	z = x * y;
}

var y = 5, z;

foo(20);
z;		// 120

foo(25);
z;		// 175


// ____________________________________________________________


function bar (x, y) {
	var z

	foo(x)
	return [y, z]

	// ****************************

	function foo (x) {
		y++;
		z = x * y
	}
}

bar(20, 5)
bar(25, 5)


// ____________________________________________________________


function bar (curX, curY) {
	const [origY, origZ] = [y, z] // capture current state

	y = curY // set the state for foo()

	foo(curX)

	const [newY, newZ] = [y, z] // save values to be returned
	[y, z] = [origY, origZ] // restore old state

	return [newY, newZ]
}

var y, z
bar(20, 5)
bar(25, 6)
