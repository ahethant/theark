( function( $ ) {
	/**
 	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */ 
	var WidgetContactFormHandler = function( $scope, $ ) {
		// Contact form 7
		(function () {
			$('.wpcf7-form-control-wrap').find('input , textarea , select').on('focusin', function () {
				var $this = $(this),
					value = $this.val();
				$this.closest('.wn-cnform').addClass('wn-active');
			});
			$('.wpcf7-form-control-wrap').find('input , textarea , select').on('focusout', function () {
				var $this = $(this),
					value = $this.val();
				if (value == '') {
					$(this).closest('.wn-cnform').removeClass('wn-active');
				}
			});
		})();
	};
	
	// Make sure you run this code under Elementor.
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction('frontend/element_ready/wn_contact_form7.default', WidgetContactFormHandler);
	} );
} )( jQuery );