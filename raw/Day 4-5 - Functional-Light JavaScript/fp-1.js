/*
what is a function?

Takes an input and computes an output and explicitly returns it.

So it's gonna have a `return` statement.
*/

// procedure! not a function
// arbitrary collection of operations
function foo (x) {
  console.log(x)
}

// procedure! not a function
// arbitrary collection of operations
function bar (x) {
  return foo(x)
}

// this is a function (in a strict sense). even if it returns _two values_.
function baz (x, y) {
  return [x + 1, y - 1]
}

// this is not. why not?
function f () {
  y = 2 * Math.pow(x, 2) + 3
}

var x, y
x = 0
f()

/*
Is f() a function?

A function doesn't "just" takes inputs and compute outputs. it *only* takes
inputs and compute outputs. If it does anything else, then it's invalid.

Functions have to take only direct inputs, and compute only direct outputs.

Indirect inputs and outputs are called "side-effects".

It's actually impossible to have a side-effect free program. For instance, heat
and time consumed in a program are still technically side-effects.

The rule is not "No side-effects".
The rule is "Avoid side-effects wherever possible"


Why would that matter?
Side-effects require a higher amount of cognitive load of the reader.
Reducing the surface area where problems can occur. Most bugs come from I/O.
Increasing the area where provable, readable code happens.
Push the side-effects to the boundary of programs.
Let's make side-effects super obiovus where they should happen.
*/

function f (x) {
  return 2 * Math.pow(x, 2) + 3
}

/*
the more context I have to read to understand a line of code, the harder it is
to read.


How to purify procedures? 4 strategies:

1. Write it again as pure. (best)
2. Refactor as pure. (way good)
3. Wrap it with a pure function. (meh)
4. Capture the current state, create a state for the impure function, get the
   values and then recreate the old state. (awful)

Function purity is a characteristic of how the function is called, more than
how the function is defined. "can I make a pure function call, or not?"
*/

// wrapping an impure function
function F (x) {
  var y
  f(x)
  return y

  function f () {
    y = 2 * Math.pow(x, 2) + 3
  }
}

var y
y = F(0);
// Caution: F() internals are now a potential source of issues. it's weak.


/*
we need to focus on the way a function is called.

A function is so that, given the same inputs, it always return the same
outputs.
*/

function foo (x) {
  return bar(x)
}

function bar (y) {
  return y + 1
}

foo(1)



/*
PARAMETERS. 
How many parameters a function is expected to receive? unary, binary, n-ary

A parameter is not argument. Parameter is the value that recieves the argument.

All JS are variatic = they can receive any number of arguments. The number of
arguments does not have to match the number of defined parameters.

f(...args) = explicitly declaring a variatic function

FP programmers prefer unary functions. why? bcos unary functions have a 1-1
correpondence between "i take one argument, i return an argument", which make
it easier for them to compose with other functions.


We use functions as values.
*/


// unary
const unary = fn => arg => fn(arg)

['1', '2', '3'].map(parseInt) // [1, NaN, NaN]
['1', '2', '3'].map(unary(parseInt)) // [1, 2, 3]


// apply = pass in arguments of previously arrayed arguments
const apply = fn => args => fn(...args)


// unapply = pass in an array of previously separated arguments
const unapply = fn => (...args) => fn(args)



/*
POINT-FREE programming
Function's input is called "point". Is the notion of defining functions in such
a way that we don't need to explicitly express its points (inputs)
*/

foo(v => bar(v))  // both
foo(bar)          // are equivalent



const not = fn => (...args) => !fn(...args)

const isOdd = v => v % 2 == 1
const isEven = not(isOdd) //point-free style

isEven(4)


/*
IMMUTABILITY
You might just need immutability structures when your data is suposed to change,
so the data only mutates when actively requested, and not in an unexpected way.
OTOH, if ur data is not gonna change, why would you need an immutable structure
with all the overhead? declare intnet (Object.freeze()).

Treat a value as immutable regardless of what it actually is.
*/
