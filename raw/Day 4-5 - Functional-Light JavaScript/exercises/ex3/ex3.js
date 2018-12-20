function increment(x) { return x + 1; }
function decrement(x) { return x - 1; }
function double(x) { return x * 2; }
function half(x) { return x / 2; }

const pipe = (...fns) => param => fns.reduce((acc, f) => f(acc), param)
const compose = (...fns) => param => fns.reduceRight((acc, f) => f(acc), param)

var f = compose(decrement,double,increment,half);
var p = pipe(half,increment,double,decrement);

console.log(p(3) === 4)
console.log(f(3) === p(3))
