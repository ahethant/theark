( function( $ ) {
	/**
 	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */
	var WidgetSVGHandler = function( $scope, $ ) {
		$('.wn-svg-wrap').each(function () {
			var svg_uniq_id = $(this).data('svg');
			$(this).find('svg').attr('id', svg_uniq_id);
			new Vivus(svg_uniq_id, {
				type: 'oneByOne',
				duration: 60,
				start: 'inViewport',
				animTimingFunction: Vivus.LINEAR,
			});
		});
	};

	// Make sure you run this code under Elementor.
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction('frontend/element_ready/wsvg.default', WidgetSVGHandler );
	} );
} )( jQuery );