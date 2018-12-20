function lotteryNum () {
	return (Math.round(Math.random() * 100) % 58) + 1;
}

const orderByGreater = (a, b) => a - b

function pickNumber (list) {
	
	var newNum = lotteryNum()

	while (list.includes(newNum)) {
		newNum = lotteryNum()
	}

	var newList = [...list, newNum]

	return newList.sort(orderByGreater)
}

var luckyLotteryNumbers = [];
const AMOUNT_OF_NUMBER = 6

for (let i = 0; i < AMOUNT_OF_NUMBER; i++) {
	luckyLotteryNumbers = pickNumber(Object.freeze(luckyLotteryNumbers))
}

console.log(luckyLotteryNumbers);
