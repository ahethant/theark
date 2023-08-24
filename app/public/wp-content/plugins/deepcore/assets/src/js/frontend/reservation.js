( function( $ ) {
	/**
 	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */
	var WidgetReservationButtonHandler = function( $scope, $ ) {
		$('.wn-niceselect:not(.infoselect)').niceSelect();

		if ($('.open-table-date').length) {
			$('.open-table-date').datepicker({
				format: "yyyy/dd/MM",
			});
		}
	};

	// Make sure you run this code under Elementor.
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction('frontend/element_ready/reservation.default', WidgetReservationButtonHandler);
	} );
} )( jQuery );