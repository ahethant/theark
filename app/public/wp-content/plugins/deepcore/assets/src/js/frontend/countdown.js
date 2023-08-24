(function ($) {
	jQuery('.countdown-w').each(function () {
		var days = jQuery('.days-w .count-w', this);
		var hours = jQuery('.hours-w .count-w', this);
		var minutes = jQuery('.minutes-w .count-w', this);
		var seconds = jQuery('.seconds-w .count-w', this);
		var until = parseInt(jQuery(this).data('until'), 10);
		var done = jQuery(this).data('done');
		var self = jQuery(this);
		var updateTime = function () {
			var now = Math.round((+new Date()) / 1000);
			if (until <= now) {
				clearInterval(interval);
				self.html(jQuery('<span />').addClass('done-w block-w').html(jQuery('<span />').addClass('count-w').text(done)));
				return;
			}
			var left = until - now;
			seconds.text(left % 60);
			left = Math.floor(left / 60);
			minutes.text(left % 60);
			left = Math.floor(left / 60);
			hours.text(left % 24);
			left = Math.floor(left / 24);
			days.text(left);
		};
		var interval = setInterval(updateTime, 1000);
	});

	var doneMessage = jQuery('.countdown-clock').data('done');
	var futureDate = new Date(jQuery('.countdown-clock').data('future'));
	var currentDate = new Date();
	var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

	function dayDiff(first, second) {
		return (second - first) / (1000 * 60 * 60 * 24);
	}
	if (dayDiff(currentDate, futureDate) < 100) {
		jQuery('.countdown-clock').addClass('twoDayDigits');
	} else {
		jQuery('.countdown-clock').addClass('threeDayDigits');
	}
	if (diff < 0) {
		diff = 0;
		jQuery('.countdown-message').html(doneMessage);
	}
	var clock = jQuery('.countdown-clock').FlipClock(diff, {
		clockFace: 'DailyCounter',
		countdown: true,
		autoStart: true,
		callbacks: {
			stop: function () {
				jQuery('.countdown-message').html(doneMessage)
			}
		}
	});
})(jQuery);