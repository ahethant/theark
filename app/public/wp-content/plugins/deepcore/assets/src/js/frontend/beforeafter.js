(function ($) {
	$(window).on('load', function () {
		if ($.fn.twentytwenty) {
			$(".wn-before-after").each(function (index, el) {
				var $section = $(this),
					visible_value = $section.attr('data-visible-value'),
					orientation = $section.attr('data-orientation'),
					before_label = $section.attr('data-before-label'),
					after_label = $section.attr('data-after-label');
				if ($section.attr('data-no-overlay') === 'true') {
					var no_overlay = true;
				} else if ($section.attr('data-no-overlay') === 'false') {
					var no_overlay = false;
				}
				$section.twentytwenty({
					default_offset_pct: visible_value, // How much of the before image is visible when the page loads
					orientation: orientation, // Orientation of the before and after images ('horizontal' or 'vertical')
					before_label: before_label, // Set a custom before label
					after_label: after_label, // Set a custom after label
					no_overlay: no_overlay //Do not show the overlay with before and after
				});
				var run = true
				$('.whb-nav-wrap .nav li.mega').on('hover', function () {
					var $this = $(this);
					setTimeout(function () {
						if (run == true) {
							$section.twentytwenty({
								default_offset_pct: visible_value, // How much of the before image is visible when the page loads
								orientation: orientation, // Orientation of the before and after images ('horizontal' or 'vertical')
								before_label: before_label, // Set a custom before label
								after_label: after_label, // Set a custom after label
								no_overlay: no_overlay //Do not show the overlay with before and after
							});
							run = false;
						}
					}, 500);
				});
			});
		}
	});
})(jQuery);