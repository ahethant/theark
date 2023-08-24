( function( $ ) {
	$(document).ready(function () {
        var auto_hide = false;

		if ($('body').hasClass('wn-hide-scrollbar')) {
			auto_hide = true;
		}

		function check_body_height(elm, callback) {
			var lastHeight = elm.clientHeight,
				newHeight;
			(function run() {
				newHeight = elm.clientHeight;
				if (lastHeight != newHeight)
					callback();
				lastHeight = newHeight;

				if (elm.onElementHeightChangeTimer)
					clearTimeout(elm.onElementHeightChangeTimer);

				elm.onElementHeightChangeTimer = setTimeout(run, 200);
			})();
		}

		if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 960) {
			if ($('body').hasClass('wn-custom-scrollbar')) {
				if ($.fn.niceScroll) {
					$('.wn-custom-scrollbar').niceScroll({
						autohidemode: auto_hide,
						cursorborder: "0",
					});
				}
			}
			check_body_height(document.body, function () {
				if ($.fn.getNiceScroll) {
					$(".wn-custom-scrollbar").getNiceScroll();
				}
			});
		}
    });
})( jQuery );