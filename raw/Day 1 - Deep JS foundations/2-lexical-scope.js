// LEXICAL SCOPE


// Lexical scope vs. dynamic scope (determined at runtime)

function foo () {
  var bar = 'bar'

  function baz () {
    // Lexical scope. this "bar" is the bar defined 3 lines above
    console.log(bar)
  }
  baz()
}



// Function scoping. IIFE.

/*
keep everything private as much as possible.
  1. the less u have exposed, the less surface area you have for accidental
     collisions.
  2. prevent someone from using internal details in an unintended way.
  3. if u hide it, you reserve the right to refactor it.


Idea: nest a whole file content inside an IIFE. If your program breaks,
is that your code was leaking, and some benefits from above where violated.

*/



// Block scoping.

/*
let = is not a replacement for var. not a "better" var.
it is an augmentation to var to do a different thing, in a places where
that thing is useful.
*/

// enforce a variable exists inside a block statement. For instance:
function diff(x, y) {
  if (x > y) {
    var tmp = x
    x = y
    y = tmp
  }

  console.log(tmp) // works
  return y - x
}

function diff2(x, y) {
  if (x > y) {
    let tmp = x
    x = y
    y = tmp
  }

  console.log(tmp) // tmp is not defined
  return y - x
}




function repeat(fn, n) {
  var result

  for (let i = 0; i < n; i++) {
    result = fn(result, i)
  }

  return result
}

/*
Should result be a var? i'm saying to the reader:
"this variable is going to be use across the entire scope of the function"

If I switch it to let, I'm removing semantic information from the program.

semmantically, signals a different intent.
*/



// When does var > let ?
// collocated. stylistically, it provides intent and "scoping"
// easier to debug if the try/catch is not there (no need to change let to var)
function loookupRecord(str) {
  try {
    var id = getRecord(str)
  } catch (error) {
    var id = -1
  }

  return id
}

// moreover, you cannot "redeclare" a let variable. You can do that with var.



// CONST
/*
const declares a variable that cannot be reassigned
it doesn't match semmantically what we would expect from a "consntat" value


*/