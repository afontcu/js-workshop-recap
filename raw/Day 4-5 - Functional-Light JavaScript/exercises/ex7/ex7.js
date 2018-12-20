// code here! :)

// 1
var get4 = () => 4
var get5 = () => 5

// 2
var add = (a, b) => a + b
// console.log(add(get4(), get5()))

// 3
var add2 = (fn1, fn2) => add(fn1(), fn2())
// console.log(add2(get4, get5))

// 4
function getNumber (value) {
  return function () {
    return value
  }
}

// 5
function addn_loop (...fns) {
  var result = 0
  for (let i = 1; i < fns.length; i++) {
    result += add2(fns[i - 1], fns[i])
  }
  return result
}
// console.log(addn_loop(get4, get5))


function addn_rec ([fn1, fn2, ...fns]) {
  if (fns.length === 0) return add2(fn1, fn2)
  return addn_rec([ () => add2(fn1, fn2), ...fns ])
}

// console.log(addn_rec(get4, get5))


function addn_builtin (...fns) {
  return fns.reduce(function (acc, i) {
    return () => add2(acc, i)
  })()
}
// console.log(addn_builtin(get4, get5))


// 6
const arr = [1, 2, 3, 11, 23, 14, 6, 1, 1, 16, 7, 8, 4, 13, 12, 4, 6, 18, 9, 5, 3]

// cool way: var uniqueArr = [...new Set(arr)]
function uniqueArr (arr) {
  return arr.reduce((acc, i) => {
    return acc.includes(i)
      ? acc
      : [...acc, i]
  }, [])
}

var uniqueArr = (arr) => arr.reduce(
  (acc, i) => acc.includes(i) ? acc : [...acc, i],
  []
)

// console.log(uniqueArr(arr))


// 7
var isEven = x => x % 2 == 0
var evenArray = arr.filter(isEven)
// console.log(evenArray)


// 8
console.log(
  addn_rec(arr.map(getNumber))
)
