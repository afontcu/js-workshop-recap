// HOISTING

/*
Hoisting "per se" does not exist, but it's actually a thing. As we learned
during 1-scope, first we parse the code and then we execute it, so it's like
we "hoisted" declarations to the begining of the code.



a;  // undefined
b;  // undefined
var a = b;
var b = 2;

could look like:

var a;
var b;
a;
b;
a = b;
b = 2;


The same happens with functions. This way, you can place your executable code
first and then all the functions below.


foo()

// *******************

function foo () {
  var x = bar()
  return x

  // *****************

  function bar () {}
}
*/

var x = 1

function foo() {
  console.log(x)
  var x = 2
}

// foo()


/*
var x
function foo() {
  var x
  console.log(x)
}


little gotcha:
var declarations hoist and initialize as undefined
let declarations hoist BUT don't initialize

*/