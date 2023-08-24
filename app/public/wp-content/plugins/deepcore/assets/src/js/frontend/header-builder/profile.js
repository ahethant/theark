(function ($) {
	"use strict";
	jQuery(document).ready(function () {				
		$('.whb-profile-socials-text').on('mouseenter', function(){
			$(this).closest('.whb-profile-socials-wrap').find('.whb-profile-socials-icons').removeClass('profile-socials-hide').addClass('profile-socials-show');
		})
		.on('mouseleave', function(){
			$(this).closest('.whb-profile-socials-wrap').find('.whb-profile-socials-icons').removeClass('profile-socials-show').addClass('profile-socials-hide');
		});
	});
})(jQuery);