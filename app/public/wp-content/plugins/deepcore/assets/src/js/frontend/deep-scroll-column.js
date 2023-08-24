( function( $ ) {
	$(document).ready(function () {
        if (Math.max(document.documentElement.clientWidth, window.innerWidth || 0) > 960) {
			if ($.fn.niceScroll) {
				$('.wn-inner-scroll-column').niceScroll({
					scrollbarid: 'wn-inner-scroll-column',
					cursorborderradius: "0",
					cursorwidth: "12px",
					cursorborder: "0",
					autohidemode: false,
				});
			}
		}
    });
})( jQuery );