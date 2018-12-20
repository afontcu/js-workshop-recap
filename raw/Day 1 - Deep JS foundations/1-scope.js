// SCOPE

var foo = 'bar'

function bar() {
  var foo = 'baz'
}

function baz (foo) {
  'use strict'
  foo = 'bam'
  bam = 'yay'
}

/*
red marble = global scope


Question / answer pattern between compiler(parser) and the 'scope manager'.

Compiler gets a declaration and says: 'hey scope manager, what bucket does this marble go in?'


formal declarations (they create buckets):
var foo = 'bar'
function bar()
function baz()

goes like this:
- have you ever heard of foo?
+ No, I need to create a marble. A red marble (global scope). Drop it in the red bucket.
- line 3. have u ever heard of bar?
+ No. Another red marble. Drop it in the red bucket.
+ but wait it was a function, let's create another bucket. a blue bucket.
- hey scope of bar(), i've found foo, ever heard of foo?
+ No (no in the blue bucket!!). Here's a blue marble. 
- line 7, ever heard of baz?
+ No. Here's a red marble.
+ but wait it was a function, let's create another bucket. a green bucket.
- OK. hey scope of baz, i have a formal declaration for 'foo'. ever heard?
+ No. here's your green marble. 


At line 9 there's no formal declaration. We are on parsing/compiling time, not execution time!


Now let's execute:

execute line 1. we need another piece of information. A variable can either be 
the target of an assignment or its source. In line 1, it's the source.
we need to do a lookup.

- hey scope manager, i'm execution enginer. i have a execution for foo. any idea of 'foo'?
+ yes! i have a red marble called 'foo'!
+ ok, i assigned the value 'bar' to this red marble called 'foo'.
then line 4. (same with 'foo' inside of 'bar'. it assignes to the blue marble)
then line 8:
- hey scope of 'baz', i have an LHS reference for 'foo'
+ yes, here's your green marble.
then line 9:
- hey scope of 'baz', i have an LHS reference for 'bam'. ever heard?
+ No. Go look elsewhere!
- ok. Hey red bucket,  i have an LHS reference for 'bam'. ever heard?
+ No. But I'm the global scope, so... let me create a red marble for you. // <---- WTF. worst idea ever
Notice the marble is red. We finished talking to the 'baz' scope manager.
In strict mode, that dumb thing that happened is forbidden. It throws a "Reference Error: bam is not defined"
They should've said "is not declared" instead of "defined", but... fuck that.
*/


var foo = 'bar' // a red bucket

function bar() {  // a blue bucket inside a red bucket
  var foo = 'baz' // (this is called shadowing, reassigning a variable)

  function baz (foo) { // a green bucket inside a blue bucket inside a red bucket
    foo = 'bam'
    bam = 'yay'
  }

  baz()
}

// (during execution) 
// hey global scope, i have a RHS (because it's not a LHS, lol). ever heard of him?
// yes, here's your red marble. A function is stored there. Then we execute.
// first: we resolve what's in the variable. second: we execute that variable.
bar() 
foo   // "bar"
bam   // depends on we are using 'use strict'!! "yay" or ReferenceError
baz() // "Reference Error: baz is not defined"


// Not a function declaration because "function" is not the first word of the
// sentence. It's a function expression.
var foo = function bar() { // bar is placed in the scope of foo! Not in the global
  var foo = 'baz'

  function baz (foo) {
    foo = bar // i can reference "bar" here
    foo()
  }
  baz()
}

foo()
bar() // Error!


// declaration:
function sth() {}

// expression
var sth = function bla() {}

// named function expressions
var clickHandler = function() {} // anonymous function expression
var keyHandler = function whatever() {} // named function expression

/*
benefits of named function expressions:
  name on stack traces
  handy self-reference
  self-documenting code
  
Every function has a purpose, then every function has a name. Thus, every
function should have a name. Every anonymous function expression should be a
named function.
*/


