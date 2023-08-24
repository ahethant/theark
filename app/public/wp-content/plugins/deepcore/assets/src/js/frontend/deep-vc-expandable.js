( function( $ ) {
	$.fn.wnExpandable = function (options) {
		var settings = $.extend({
			id: 0,
			selector: '',
		}, options);

		initExpandable();

		function initExpandable() {
			jQuery(document).on('click', settings.selector, function () {
				jQuery('.wn-section-' + settings.id + ' .vc_section').slideToggle('slow');
			});
		}
	};
})( jQuery );