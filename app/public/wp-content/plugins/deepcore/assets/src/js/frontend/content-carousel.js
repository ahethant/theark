(function ($) {
	$(window).on( 'load', function () {
		$('.wn-content-carousel').each(function () {
			var owl = $(this).find('.content-carousel-tab .tabs'),
				$mega = $(this).parents('li.mega'),
				items = owl.data('items'),
				dots = owl.data('dots'),
				nav = owl.data('nav'),
				margin = owl.data('margin'),
				stagepadding = owl.data('stagepadding'),
				rtl = owl.data('rtl');

			$mega.find('.sub-menu').css({
				'visibility': 'hidden',
				'display': 'block',
			});

			$(this).find('.content-carousel-tab .tabs').owlCarousel({
				items: items,
				autoPlay: true,
				dots: dots,
				nav: nav,
				navText: ["<span class='ol-pre'></span>", "<span class='ol-nxt'></span>", "", ""],
				margin: margin,
				stagePadding: stagepadding,
				responsiveClass: true,
				rtl: rtl,
				responsive: {
					0: {
						items: 1,
						stagePadding: 0,
					},
					480: {
						items: 1,
						stagePadding: 0,
					},
					768: {
						items: 2,
						stagePadding: 0,
					},
					960: {
						items: items,
					},
				}
			});

			$mega.find('.sub-menu').css({
				'visibility': 'visible',
				'display': 'none',
			});
		});
	});
})(jQuery);