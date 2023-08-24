'use strict';

(function ($) {
	$(document).ready(function () {
		var $container = $('.wn-plugins .themes');
		var $grid = $container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			},
			layoutMode: 'fitRows'
		});

		var $filterButtons = $('.wn-plugins-categories a');
		plugin_counts();

		function plugin_counts() {
			// get filtered item elements
			var itemElems = $grid.isotope('getFilteredItemElements');
			var $itemElems = $(itemElems);
			$filterButtons.each(function (i, button) {
				var $button = $(button);
				var filterValue = $button.attr('data-filter');
				if (!filterValue) {
					return;
				}
				var count = $itemElems.filter(filterValue).length;
				$button.find('.wn-filter-count').text(count);
			});
		}

		$filterButtons.on('click', function () {
			var selector = $(this).attr('data-filter');
			var $grid_item = $container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false,
				},
				layoutMode: 'fitRows',
				fitRows: {
					gutter: 39
				}
			});
			return false;
		});

		var $optionSets = $('.wn-plugins-categories'),
			$optionLinks = $optionSets.find('a');

		$optionLinks.on('click', function () {
			var $this = $(this);
			// don't proceed if already selected
			if ($this.hasClass('selected')) {
				return false;
			}
			var $optionSet = $this.parents('.wn-plugins-categories');
			$optionSet.find('.wn-plugin-selected').removeClass('wn-plugin-selected');
			$this.addClass('wn-plugin-selected');
		});

	});
})(jQuery);