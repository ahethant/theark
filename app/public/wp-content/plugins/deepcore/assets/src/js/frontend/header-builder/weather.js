(function ($) {
	"use strict";
	jQuery(document).ready(function () {
		/* Weather */
		$(document).ajaxComplete(function (event, request, settings) {
			if ($('#wpc-weather').length > 0) {
				var weather_today = $('#wpc-weather').find('.today').find('.day').html();
				if ($('#wpc-weather').children('.today').length) {
					weather_today = weather_today.replace('Today', 'Today:');
				}
				$('#wpc-weather').find('.today').find('.day').html(weather_today);
				$('#wpc-weather').find('.time_symbol').find('svg').attr('enable-background', 'new 27 27 46 46');
				$('#wpc-weather').find('.time_symbol').find('svg').removeAttr('viewBox');
				$('#wpc-weather').find('.time_symbol').find('svg').each(function () {
					$(this)[0].setAttribute('viewBox', '27 27 46 46')
				});
			}
		});
	});
})(jQuery);