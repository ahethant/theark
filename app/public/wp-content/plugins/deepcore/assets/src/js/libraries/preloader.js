(function ($) {

	'use strict';

	var preloaderTimeout = $('.pg-loading-screen').data('timeout');

	if (preloaderTimeout) {
		$(' body ').removeClass('wn-preloader').addClass('wn-start-rendering');

		setTimeout( function() {
			$('.pg-loading-screen').addClass('deep-none-preloader');
		}, preloaderTimeout);
	} else {
		$(' body ').removeClass('wn-preloader').addClass('wn-start-rendering');

		$(window).on('load', function () {
			setTimeout( function() {
				$('.pg-loading-screen').addClass('deep-none-preloader');
			}, 1000);
		});
	}

})(jQuery);
