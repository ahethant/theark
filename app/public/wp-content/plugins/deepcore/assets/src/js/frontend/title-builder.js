( function( $ ) {
	/**
 	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */
	var WidgetTitleBuilderHandler = function ($scope, $) {

		$('.wn-animation-run:not(.wn-done-anim), .wn-deep-title-wrap:not(.wn-done-anim), .wn-layer-anim-bottom:not(.wn-done-anim), .wn-layer-anim-top:not(.wn-done-anim), .wn-layer-anim-left:not(.wn-done-anim), .wn-layer-anim-right:not(.wn-done-anim), .wn-layer-anim-zoom-in:not(.wn-done-anim), .wn-layer-anim-zoom-out:not(.wn-done-anim), .wn-layer-anim-fade:not(.wn-done-anim), .wn-layer-anim-flip:not(.wn-done-anim), .title-plus-text:not(.wn-done-anim)').waypoint(function () {
			$(this).addClass('wn-done-anim');
		},
		{
			offset: '90%'

		});

	};

	// Make sure you run this code under Elementor.
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction('frontend/element_ready/title_builder.default', WidgetTitleBuilderHandler);
	} );
} )( jQuery );