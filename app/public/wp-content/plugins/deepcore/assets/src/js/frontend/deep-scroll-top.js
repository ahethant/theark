( function( $ ) {
	jQuery(document).ready(function () {
        jQuery(window).on('scroll', function () {
			if (jQuery(this).scrollTop() > 100) {
				jQuery('.scrollup').fadeIn();
			} else {
				jQuery('.scrollup').fadeOut();
			}
		});

		jQuery('.scrollup').on('click', function () {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 700);
			return false;
		});

		jQuery(function () {
			jQuery('.wn-smoothscroll-a').on('click', function () {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = jQuery(this.hash);
					target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						jQuery('html,body').animate({
							scrollTop: target.offset().top
						}, 700);
						return false;
					}
				}
			});
			$('.nav > li > a[href*="#"]:not([href="#"]),.responav > li > a[href*="#"]:not([href="#"])').on('click', function () {
				if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
					var target = $(this.hash);
					target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
					if (target.length) {
						$('html, body').animate({
							scrollTop: target.offset().top
						}, 700);
						return false;
					}
				}
			});
		});
    });
})( jQuery );