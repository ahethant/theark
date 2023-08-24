(function ($) {
	/**
	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */
	var Widget_FoodMenu_Handler = function ($scope, $) {
		if ($('.fm-w2-item').find('img').length) {
			$('.fm-w2-item').find('img').on('click', function () {
				var $this = $(this),
					data_src = $this.data('src');
				$('body').append('<div class="food-menu-image-wrap"><i class="wn-icon sl-close"></i><img src="' + data_src + '" class="food-menu-image"></div>');
				setTimeout(function () {
					$('.food-menu-image-wrap').find('i.wn-icon').on('click', function () {
						$('.food-menu-image-wrap').remove();
					});
				}, 500);
			});
		}

	};

	// Make sure you run this code under Elementor.
	$(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/food_menu.default', Widget_FoodMenu_Handler);
	});
})(jQuery);