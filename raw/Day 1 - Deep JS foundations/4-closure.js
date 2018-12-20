// CLOSURE

/*
remember the lexical scope *even* when the function is executed outside
that lexical scope.
*/

function foo () {
  var bar = 'bar'

  setTimeout(() => {
    console.log(bar)
  }, 0)

  bar = 'bar2'
}

foo() // 'bar2'

// close is NOT a snapshot.


function foo () {
  var bar = 'bar'

  setTimeout(() => {
    console.log(bar)
  }, 1000)

  bar = 'bar2'
}

foo() // 'bar2'
