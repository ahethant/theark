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
		// Contact Dropdown
		$('.whb-contact').each(function (index, el) {
			$(this).find('#wn-contact-dropdown-icon').on('click', function (event) {
				event.preventDefault();
				$(this).siblings('#wn-contact-form-wrap').fadeToggle('fast', function () {
					if ($("#wn-contact-form-wrap").is(":visible")) {
						$(document).on('click', function (e) {
							var target = $(e.target);
							if (target.parents('.whb-contact').length)
								return;
							$("#wn-contact-form-wrap").css({
								display: 'none',
							});
						});
					}
				});
			});
		});
	});
})(jQuery);