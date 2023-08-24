( function( $ ) {
	$(document).ready(function () {
        if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 960) {
			$('.wn-toggle-column-icon').toggle(function () {

				var toggle_height_close = $('.wn-toggle-column').find('.wn-toggle-column-icon').attr("data-toggle_height_close");
				var toggle_width_close = $('.wn-toggle-column').find('.wn-toggle-column-icon').attr("data-toggle_width_close");

				$(".wn-toggle-column-icon").removeClass("wn-toggle-open").addClass("wn-toggle-close");

				$('.wn-toggle-column').animate({
					width: [toggle_width_close, 'swing'],
					height: [toggle_height_close, 'swing']
				}, {
					duration: "slow",
					easing: "easein"
				});

			}, function () {

				var toggle_height_open = $('.wn-toggle-column').find('.wn-toggle-column-icon').attr("data-toggle_height_open");
				var toggle_width_open = $('.wn-toggle-column').find('.wn-toggle-column-icon').attr("data-toggle_width_open");

				$(".wn-toggle-column-icon").removeClass("wn-toggle-close").addClass("wn-toggle-open");

				$('.wn-toggle-column').animate({
					width: [toggle_width_open, 'swing'],
					height: [toggle_height_open, 'swing']
				}, {
					duration: "slow",
					easing: "easein"
				});

			});
		}
    });
})( jQuery );