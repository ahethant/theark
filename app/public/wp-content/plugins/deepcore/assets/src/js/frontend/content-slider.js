(function ($) {
	$(window).on( 'load', function() {
		$('.ww-cs-cn').each(function (index, el) {
			var owl = $(this),
				dots = owl.data('bullet'),
				nav = owl.data('arrow'),
				speed = owl.data('speed'),
				arrow_left = owl.data('arrow-left'),
				arrow_right = owl.data('arrow-right'),
				autoplay = '';

			if (owl.data('play') == true) {
				autoplay = true;
			} else {
				autoplay = false;
			}

			owl.owlCarousel({
				items: 1,
				dots: dots,
				nav: nav,
				navText: ["<span class='wn-owl-prev content-slider-arrow-icon'>" + arrow_left + "</span>", "<span class='wn-owl-next content-slider-arrow-icon'>" + arrow_right + "</span>", "", ""],
				autoplayTimeout: speed,
				responsiveClass: true,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut',
				mouseDrag: false,
				loop: true,
				autoplay: autoplay,
			});
		});

		$('.wn-content-slider-wrap').each(function (index, el) {
			var $number_container = $(this),
				$number_enable = $number_container.data('number');
			if ($number_enable === true) {
				var totalItems = $number_container.find('.owl-item:not(.cloned)').length;
				if (totalItems > 0 && totalItems < 10) {
					totalItems = '0' + totalItems;
				}
				var currentIndex = $number_container.find('.owl-item.active').index() - 1;
				if (currentIndex > 0 && currentIndex < 10) {
					currentIndex = '0' + currentIndex;
				}
				$number_container.find('.content-slider-num').html('<span class="content-slider-num-current">' + currentIndex + '</span><span class="content-slider-num-total">/' + totalItems + '</span>');

				$number_container.on('changed.owl.carousel', function (event) {
					var currentIndex = event.item.index - 1;
					if (currentIndex > 0 && currentIndex < 10) {
						currentIndex = '0' + currentIndex;
					}
					if (currentIndex == '0') {
						currentIndex = totalItems;
					}
					total_container.siblings('.content-slider-num').html('<span class="content-slider-num-current">' + currentIndex + '</span><span class="content-slider-num-total">/' + totalItems + '</span>');
				});
			}
		});

		$('.wn-content-slider').each(function (index, el) {
			var owl = $(this),
				dots = owl.data('bullet'),
				nav = owl.data('arrow'),
				speed = owl.data('speed'),
				arrow_left = owl.data('arrow-left'),
				arrow_right = owl.data('arrow-right');

			owl.owlCarousel({
				items: 1,
				dots: dots,
				nav: nav,
				navText: ["<span class='wn-owl-prev content-slider-arrow-icon'>" + arrow_left + "</span>", "<span class='wn-owl-next content-slider-arrow-icon'>" + arrow_right + "</span>", "", ""],
				speed: speed,
				responsiveClass: true,
				animateIn: 'fadeIn',
				animateOut: 'fadeOut',
				mouseDrag: false,
				loop: true,
			});
		});
	});
})(jQuery);