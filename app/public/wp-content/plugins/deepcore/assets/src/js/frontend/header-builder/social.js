(function ($) {
	"use strict";
	jQuery(document).ready(function () {
		// Social modal
		var header_social = $('.header-social-modal-wrap').html();
		$('.header-social-modal-wrap').remove();
		$(".main-slide-toggle").append(header_social);
		// Share modal
		var header_share = $('.header-share-modal-wrap').html();
		$('.header-share-modal-wrap').remove();
		$(".main-slide-toggle").append(header_share);
		// Social dropdown
		$('.whb-social').each(function (index, el) {
			$(this).find('#wn-social-dropdown-icon').on('click', function (event) {
				event.preventDefault();
				$(this).siblings('#header-social-dropdown-wrap').fadeToggle('fast', function () {
					if ($("#header-social-dropdown-wrap").is(":visible")) {
						$(document).on('click', function (e) {
							var target = $(e.target);
							if (target.parents('.whb-social').length)
								return;
							$("#header-social-dropdown-wrap").css({
								display: 'none',
							});
						});
					}
				});
			});
		});
		// social full
		$('.whb-social').find('#wn-social-slide-icon').each(function (index, el) {
			$(this).magnificPopup({
				type: 'inline',
				removalDelay: 100,
				mainClass: 'mfp-zoom-in full-social',
				midClick: true,
				showCloseBtn: true,
				closeBtnInside: false,
				closeOnBgClick: false,
			});
		});
		// Social Toggles
		$('#wn-social-modal-icon').on('click' ,function (e) {
			e.preventDefault();
			var $current_element = $(this).closest('#webnus-header-builder');
			if ($current_element.find('.wn-header-social').hasClass('opened')) {
				$current_element.find('.main-slide-toggle').slideUp('opened');
				$current_element.find('.wn-header-social').removeClass('opened');
			} else {
				$current_element.find('.main-slide-toggle').slideDown(240);
				$current_element.find('#header-search-modal').slideUp(240);
				$current_element.find('#header-share-modal').slideUp(240);
				$current_element.find('#header-social-modal').slideDown(240);
				$current_element.find('.wn-header-social').addClass('opened');
				$current_element.find('.wn-header-search').removeClass('opened');
				$current_element.find('.wn-header-share').removeClass('opened');
			}

		});
		$(document).on('click', function (e) {
			if (e.target.id == 'wn-social-modal-icon')
				return;

			var $this = $('#wn-social-modal-icon');
			if ($this.closest('#webnus-header-builder').find('.wn-header-social').hasClass('opened')) {
				$this.closest('#webnus-header-builder').find('.main-slide-toggle').slideUp('opened');
				$this.closest('#webnus-header-builder').find('.wn-header-social').removeClass('opened');
			}
		});
	});
})(jQuery);