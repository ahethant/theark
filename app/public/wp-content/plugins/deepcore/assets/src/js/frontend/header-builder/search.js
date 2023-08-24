(function ($) {
	"use strict";
	jQuery(document).ready(function () {

		$('.whb-header-toggle').contentToggle({
            defaultState: 'close',
            globalClose: true,
            triggerSelector: ".whb-trigger-element",
            toggleProperties: ['height', 'opacity'],
            toggleOptions: {
                duration: 300
            }
        });

		// Search modal Type 2
		var header_search_type2 = $('.header-search-modal-wrap').html();
		$('.header-search-modal-wrap').remove();
		$(".main-slide-toggle").append(header_search_type2);

		// Search full
		if ($.fn.magnificPopup) {
			$('.whb-header-full').find('.whb-trigger-element').find('a').each(function (index, el) {
				$(this).magnificPopup({
					type: 'inline',
					removalDelay: 100,
					mainClass: 'mfp-zoom-in full-search',
					midClick: true,
					showCloseBtn: true,
					closeBtnInside: false,
					closeOnBgClick: false,
				});
			});
		}

		// Search Toggles
		$('.whb-header-slide').find('.whb-trigger-element').on('click', function () {
			var $current_element = $(this).closest('#webnus-header-builder');
			if ($current_element.find('.wn-header-search').hasClass('opened')) {
				$current_element.find('.main-slide-toggle').slideUp('opened');
				$current_element.find('.wn-header-search').removeClass('opened');
			} else {
				$current_element.find('.main-slide-toggle').slideDown(240);
				$current_element.find('#header-social-modal').slideUp(240);
				$current_element.find('#header-share-modal').slideUp(240);
				$current_element.find('#header-search-modal').slideDown(240);
				$current_element.find('.wn-header-search').addClass('opened');
				$current_element.find('.wn-header-social').removeClass('opened');
				$current_element.find('.wn-header-share').removeClass('opened');
				$current_element.find('.header-search-modal-text-box').trigger(focus);
			}
		});

		// Fix first loading view
		var $searchModalWidget = $('#header-search-modal');
		$searchModalWidget.css('opacity', '1');

	});
})(jQuery);