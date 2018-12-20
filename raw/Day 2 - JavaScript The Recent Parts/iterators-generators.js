// ITERATORS AND GENERATORS

// All data structures are iterable by default. Except for one: Object!

var str = 'Hi'
var it1 = str[Symbol.iterator]()

it1.next() // { value 'H', done: false }
it1.next() // { value 'i', done: false }
it1.next() // { value undefined, done: true }


// can be consumed with built-in JS mechanisms

for (let i of it) {
  console.log(i)
}

for (let i of str) { // you end up iterating an iterator too
  console.log(i)
}

/*
for..of is not for..in!! for..in iterates over KEYS


the "..." operator actually creates an iterable, consumes it over using
for..of and then return the individual characters of the array.


why objects are not iterable by default?

you need to define a function to the special location:
*/

var obj = {
  a: 1,
  b: 2,
  [Symbol.iterator]: function () {
    var keys = Object.keys(this)
    var index = 0
    return {
      next: () => (index < keys.length)
        ? { done: false, value: this[keys[index++]] }
        : { done: true, value: undefined }
    }
  }
}

console.log([...obj]) // [1,2]


// GENERATORS

// caution: avoid "returning" values from iterators besides yielding them.
// iterating over an iterator won't get you the returned value.


var obj = {
  a: 1,
  b: 2,
  *[Symbol.iterator]() {
    for (let key of Object.keys(this)) {
      yield this[key]
    }
  }
}

console.log([...obj]) // [1,2]
