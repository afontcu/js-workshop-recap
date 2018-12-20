$(document).ready(function(){
	var $btn = $("#btn")
	var $list = $("#list")

	var clicks = ASQ.react.of()
	var msgs = ASQ.react.of()

	$btn.click(function(evt){
		clicks.push(evt)
	});



	msgs = (function(clicks) {
		var output = ASQ.react.of()
		var shouldAdd = true

		setInterval(() => {
			shouldAdd = true
		}, 1000)
		
		clicks.val(val => {
			if (shouldAdd) {
				output.push(val)
				shouldAdd = false
			}
		})

		return output
	})(clicks)


	msgs.val(() => {
		$list.append('clicked!' + "<br>");
	})
});
