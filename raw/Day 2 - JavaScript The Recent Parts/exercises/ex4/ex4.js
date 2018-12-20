var numbers = {
	*[Symbol.iterator]({
		start = 1,
		end = 100,
		step = 1,
	} = {}) {
    for (let key = start; key <= end; key += step) {
			yield key
		}
  }
};

function getLuckyNumbers ({ start, end, step }) {
	return [...numbers[Symbol.iterator]({start, end, step})]
}

function normalFor ({ start, end, step }) {
	var s = []
	for (let key = start; key <= end; key += step) {
		s.push(key)
	}

	return s
}



var start = 6
var end = 30000
var step = 4

console.time('iterator')
console.log(getLuckyNumbers({ start, end, step }))
console.timeEnd('iterator')

console.time('normal')
console.log(normalFor({ start, end, step }))
console.timeEnd('normal')
