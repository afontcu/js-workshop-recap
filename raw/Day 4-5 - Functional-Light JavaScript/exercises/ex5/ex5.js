function foo(x, y) {
  return function sum() { // this function closes over X and W
    return x + y
  }
}

var x = foo(3,4);

x();	// 7
x();	// 7
