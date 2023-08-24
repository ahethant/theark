( function( $ ) {
	
	
		/**
		 * @param $scope The Widget wrapper element as a jQuery element
		 * @param $ The jQuery alias
		 */ 
	var Widget_Facebook_Handler = function ($scope, $) {

		$scope.find('.elementor-widget-container').find('.wn-facebook-buttons');	
		FB.XFBML.parse($scope[0]);

	};
	
	// Make sure you run this code under Elementor.
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.hooks.addAction('frontend/element_ready/wn_facebook_button.default', Widget_Facebook_Handler);
		elementorFrontend.hooks.addAction('frontend/element_ready/wn_facebook_page.default', Widget_Facebook_Handler);
		elementorFrontend.hooks.addAction('frontend/element_ready/wn_facebook_comments.default', Widget_Facebook_Handler);
		elementorFrontend.hooks.addAction('frontend/element_ready/wn_facebook_embed.default', Widget_Facebook_Handler);
	} );
} )( jQuery );