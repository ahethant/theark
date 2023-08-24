(function ($) {
	"use strict";
	jQuery(document).ready(function () {
		// Wishlist Dropdown
		$('.whb-wishlist').each(function (index, el) {
			$(this).find('#wn-wishlist-icon').on('click', function (event) {
				event.preventDefault();
				$(this).siblings('.wn-header-wishlist-wrap').fadeToggle('fast', function () {
					if ($(".wn-header-wishlist-wrap").is(":visible")) {
						$(document).on('click', function (e) {
							var target = $(e.target);
							if (target.parents('.whb-wishlist').length)
								return;
							$(".wn-header-wishlist-wrap").css({
								display: 'none',
							});
						});
					}
				});
			});
		});
		$('.wn-header-wishlist-content-wrap').find('.wn-wishlist-total').addClass('colorf');
	});
})(jQuery);