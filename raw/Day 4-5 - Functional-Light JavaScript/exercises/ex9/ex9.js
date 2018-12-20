const countdownLength = 5;

var timer = Rx.Observable.interval(1000).timeInterval();
var countdown =
	Rx.Observable.merge(
		Rx.Observable.of(-1),
		timer.take(countdownLength).pluck("value")
	)
	.map(formatCountdown);

countdown.subscribe(
	console.log.bind(console),
	null,
	console.log.bind(console,"Complete!")
);


// *************************************

function formatCountdown(counter) {
	return formatTime(countdownLength - counter - 1)
}

function formatTime(time) {
	var minutes = Math.floor(time / 60);
	var seconds = time % 60;
	if (seconds < 10) seconds = `0${seconds}`;
	return `${minutes}:${seconds}`;
}
