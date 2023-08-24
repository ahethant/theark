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
	});
})(jQuery);