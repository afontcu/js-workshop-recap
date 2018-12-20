/*
Code Quality
why we have to deal with "yeah, code quality, but..."

bcos we work on teams and we work for people that don't have that growth mindset.
"the status quo and the little better, that's good enough"

FP ask for you to think in a completely different way to think about your software.
it puts first and foremost these principles. It doesn't matter if it works
if I can't understand it, it's not good enough.
Code that is verifiable, understandable, that's the most important code there is.

we need a culture within our team that says "if I put effort into making code
communicate best the ideas, that uses mathematical proven concepts, would that
make me better at my job?". We have to make our team/boss believe that.

Code quality is directly related to our ability to do our jobs. The success of
the team is related to the code quality.

Fight the "good enough".

we're not just creating readable code just for the sake of it, to feel well.
we're creating readable code because when we don't have it, is code that is asking
why this code is actually existing.

next bug: instead of just fixing it, figure out how that bug occured, what was
the root cause of the bug. State changed, side-effect, whatever. Figure out the
root cause and discover a way that not only the bug is fixable, but to make that
bug impossible to happen again. Immutable structure, maybe.
Then call a meeting with the team. I fixed the bug, but it cannot happen again.
Explain those ideas. Suggest to them "that's why we should to FP".

FP requires an extra work. A new mental model. But with that effort, generally
comes code that not only communicates better ideas, but that avoid usual bugs
and prevent them from even happening in the first time.
*/



// CLOSURES
/*
We need to revisit closures a little bit (another side of the rubik's cube).

Preservation of access to free variables. FP is all about functions, so these
variables are gonna be functions as well.

In FP we always close over things that never get reassigned. Closing over not
changing variables, functions.
So, being the same mechanism, that's a totally different approach. In "regular"
programming style, we were using closures and the module pattern to close over
ever-changing state, and encapsulating it to make it reasonable. This is not
happening in FP.
*/

function foo(x, y) {
  return function () {  // this function closes over X and W
    return x + y
  }
}

/*
In JS we can't say that a function is a pure function. We might say that
"the function, when called, behaves as a pure function"


Final side of the rubik's cube from a function definition.

foo() is lazy. Computating doesn't occur until you execute it:

var x = foo(3,4)
x()  // computating happens here.
x()  // ...but also here!

Let's imagine an eager implementation of the same function:
*/

function foo (x, y) {
  var sum = x + y  // "work" is done here
  return function () {
    return sum
  }
}

/*
there's only two lines that could reassign the `sum` variable (the thing i'm
closed over), and we can see those lines. An we can clearly see that there's no
reassignement. Thus, we have a very high degree of confidence that, giving this
system, calling foo(3, 4) twice would result in the same output.

The only way to have a high degree is making simple functions!! one-liners instead
of whole blocks of code. So much easy to reason about.
*/

/*
So, Eager vs. Lazy. Tradeoffs. Potentially unnecessary work vs. Duplicate work.
Can we get to a compromise between those two extrems?

Only do the work once, but delay the work until it needs to be done.
*/

function foo(x, y) {
  var sum
  return function() {
    if (sum === undefined) {  // only do the work if it's not been done yet
      sum = x + y
    }
    return sum
  }
}

/*
(this is called memoization).

is this still a pure function? now we are closed over a variable that absolutely
changes.

here we made a tradeoff. we might have improved performance, but now is hard to
get to the same degree of confidence to say "this is safe".

the most important point is the degree of confidence a reader can get.
the less confidence a reader has, the more chances the code does not survives.
*/

// memoize the operation so it's only get done once.
function foo(x, y) {
  return memoize(function() {
    return x + y
  })
}

/*
we achieved again a higher degree of confidence. It's easy to reason about it
again. Memoize does not provide the same performance optimization that the
if() statement. The question is: "DIY vs. memoize, is it worth it? Little
performance penalty against ease to reason and read. Tradeoffs."

A pure function is defined as a function that has referential transparency.

A function is said to have referential transparency if I can take whatever
returned value was gonna be and replace it in the place where the funcion was
called, and not affect any other part of the program.

This is a benefit for the reader.
*/



// GENERALIZED TO SPECIALIZED
// partial application or currying

/*
My goal is to remember some of the state now, and use it to my advantage later.

Specialization helps readability. Semantic boundaries.
*/

function ajax(url, data, cb) {}

ajax(CUSTOMER_API, { id: 42 }, printCustomer)
ajax(CUSTOMER_API, { id: 14 }, printCustomer)
ajax(OLD_CUSTOMER_API, { id: 15 }, printCustomer)

/*
I'd want to create intermediate representation of functions.

Let's create a semantic separation between the generic ajax function and the
specific custom call:
*/

function customerLookup(data, cb) {
  return ajax(CUSTOMER_API, data, cb)
}

customerLookup({ id: 42 }, printCustomer)
customerLookup({ id: 14 }, printCustomer)

/*
We now have improved readability of both pieces of code.

and we can keep on going:
*/

function oldCustomerLookup(data, cb) {
  return ajax(OLD_CUSTOMER_API, data, cb)
}

/*
Now things are getting repeated. We are making machines by hand. So - We need a
machine-making maching.
*/

var customerLookup = partial(ajax, CUSTOMER_API)
var oldCustomerLookup = partial(ajax, OLD_CUSTOMER_API)

/*
Separation of concerns. Right now on this line I want to say where the URL is, 
because I don't want to say it later.


What about this:
*/

customerLookup({ id: 42 }, printCustomer)
customerLookup({ id: 42 }, printCustomer2)
customerLookup({ id: 42 }, printCustomer3)
customerLookup({ id: 42 }, printCustomer4)
customerLookup({ id: 42 }, printCustomer5)
customerLookup({ id: 42 }, printCustomer6)

/*
We could benefit from partial application again.

*/

var getCurrentCustomer = partial(ajax, CUSTOMER_API, { id: 42 }) //  works, but...

var getCurrentCustomer = partial(customerLookup, { id: 42 })  // two levels of p.app.

getCurrentCustomer(printCustomer)
getCurrentCustomer(printCustomer2)
getCurrentCustomer(printCustomer3)
getCurrentCustomer(printCustomer4)
getCurrentCustomer(printCustomer5)
getCurrentCustomer(printCustomer6)

/*
I've created a whole new level of abstraction, with small but some performance
penalties, and I need to keep calling partial() all over the place.

what if I knew that, for the most part, I was about to specialized with the 
first argument, then the second, then... ?
That would reduce cognitive and visual overhead
*/


function ajax (url) {
  return function (data) {
    return function (cb) {}
  }
}

ajax(CUSTOMER_API)({ id: 42 })(printCustomer)  // but that's not what I wanted

var customerLookup = ajax(CUSTOMER_API)
var getCurrentCustomer = customerLookup({ id: 42 })

getCurrentCustomer(printCustomer)

/*
We're not required ourselves or the reader to go through these machine-making
machines.
But nobody writes functions like `ajax()` above. I need a machine-making machine
for this.

This is called "a curried version of ajax function"
*/

var ajax = curry(function ajax(url, data, cb) {})

// many curry utilities allows you to specify the amount of parameters
var ajax = curry(3, function ajax(url, data, cb) {})

// and expose it as a curried function
var ajax = curry(3)(function ajax(url, data, cb) {})

/*
most of curry implementations allows you to actually pass several parameters
to each call, instead of just one. "loosely curried".

we could've skept the first level:
*/

var customerLookup = ajax(CUSTOMER_API, { id: 42 })

/*
The purpose is to create more specialized functions from generalized functions.
the more specialized functions create semantic boundaries that make that part
of the code more readable.
You should describe functions upon how they're gonna be used.

What's the difference?
Partial Application = specializes a function by taking some arguments of now, and all 
the rest of the arguments later. If you want multi level, you need to nest
partial applications. It's a two-steps process.
Currying = specializes a function by taking none of the inputs now, and taking
inputs one at a time.

They both create specialization, but there's a difference in the way that they
achieve this specialization.

Every function has a purpose, thus every function should have a name.
And this makes even more sense in FP.
*/


/*
LIST MANIPULATION

Instead of using built-in prototype map/filter/reduce methods, FP style requires
you to use standalone utilities because you can compose them.
*/

/*
FUSION

Imagine 3 map concatenated operations. Could I do all the mapping at the same time?
Functions have to share "shape" (input, output, shape of input/output)

*/

function composeRight(fn1, fn2) {
  return (...args) => fn1(fn2(...args))
}

list
  .map(
    [div3, mul2, add1].reduce(composeRight)
  )

// composeRight has the same shape that all other reducers: takes two functions
// and returns a single function.

// FP is about seeing patterns and similar structures.


/*
TRANSDUCER

Let's you do this Fusion stuff when functions do not have a compatible shape.

list
  .map(sth)
  .filter(isEven)
  .reduce(sum)

A case for transducers.
*/

/*
Any operation such as map, filter, and reduce, can be applied to any data
structure in the application, not only lists of elements.
*/

const mapObj = (mapperFn,o) => {
	var newObj = {}
	const keys = Object.keys(o)
	for (let key of keys) {
		newObj[key] = mapperFn( o[key] )
	}
	return newObj
}

const filterObj = (predicateFn,o) => {
	var newObj = {}
	const keys = Object.keys(o)
	for (let key of keys) {
		if (predicateFn(o[key])) newObj[o[key]] = o[key]
	}
	return newObj
}

const reduceObj = (reducerFn,initialValue,o) => {
	var result = initialValue
	const keys = Object.keys(o)
	for (let key of keys) {
		result = reducerFn(result,o[key])
	}
	return result
}


/*
ASYNC FP

The async version of FP principles is using Observables, so effectively making
data structures _react_ to changes on another structures, thus creating a projection
of the initial structure.
*/