$(document).ready(function(){
	var click_num = 1;
	var $imgs = $(".fader").find("img"),i = 0;
	function changeImg(){
		var next = (++i % $imgs.length);
		$($imgs.get(next -1)).fadeOut(100);
		$($imgs.get(next)).fadeIn(100);
	}
	var interval = setInterval(changeImg, 100);

	$("body").on('click', function(){
		var click = +$(this).data('clicks') || 1;

		if (click % 2 == 1) {
			clearInterval(interval);
			$(".fader > img").css("height","80%");
			$(".fader").css({"margin-left" : "20%", "margin-top":"25%"});
			$(".fader > img").on("tap",function(){
				$(this).hide();
			});
		}else{
			$(".fader > img").css("height","100%");
			$(".fader").css("margin","0");
			interval = setInterval(changeImg, 100);
		};
		$(this).data('clicks',click+1);
		click_num++;
	});

	$(document).on('mousewheel DOMMouseScroll', function(e){
		var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, wheel) );
		if (click_num % 2 !== 1) {
			if(delta<0){
				var next = (++i % $imgs.length);
				$($imgs.get(next - 1)).fadeOut(0);
				$($imgs.get(next)).fadeIn(0);
			}else{
				var next = (--i % $imgs.length);
				$($imgs.get(next + 1)).fadeOut(0);
				$($imgs.get(next)).fadeIn(0);
			}
		}
		$(document).on('touchmove', function() {
    $(document).trigger('mousewheel');
      });
	});
});
