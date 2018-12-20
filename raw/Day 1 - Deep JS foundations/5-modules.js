// MODULES

var foo = (function() {
  var o = { bar: 'bar' } // hidden lexical variable

  return { // "public API"
    bar: function() {
      // 2. inner enclosing function with closure over the internal state
      console.log(o.bar)
    }
  }
})() // 1. outer enclosing function that is run at least once

/*
without the IIFE, I'd have a factory function. That would split out
several instance of the functions.
*/