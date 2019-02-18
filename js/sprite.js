$(function () {
	$("body").queryLoader2({
		barColor: "#09b2f3",
		backgroundColor: "#000000",
		percentage: true,
		barHeight: 1,
		completeAnimation: "fade",
		minimumTime: 100,
		onComplete: function() {
			var obj = "all_00000";
			var i = 0;
			
			var timer = setInterval(function() {
				i++;
				if(i < 30){
					$('.stroke').removeClass(obj);
					if(i<10){
						obj = 'all_0000'+i;
					} else {
						obj = 'all_000'+i;
					}		
					$('.stroke').addClass(obj);
					if(i > 10){
						$('.logo').css('opacity', i/29);
					}
				} else {
					clearInterval(timer);
				}
			}, 30);
			
		}
	});
});

// for ios devices
/*window.addEventListener('DOMContentLoaded', function() {
    $("body").queryLoader2();
});*/
