( function( $ ) {
	$('.sermon-wrap-toggle .js-contentToggle').contentToggle({
		toggleProperties: ['height', 'opacity'],
		independent: false,
		toggleOptions: {
			duration: 400
		}
	});
	var owl = $('.sermon-carousel'),
		items = owl.data('items');

	jQuery(".sermon-carousel").owlCarousel({
		items: items,
		pagination: true,
		navigation: false,
		navigationText: ["", ""],
	});

	$('.wn-sermon-media').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	$('.media-links').magnificPopup({
		delegate: '.audio-popup',
		removalDelay: 100,
		callbacks: {
			beforeOpen: function () {
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true
	});

	$('.video-popup').magnificPopup({
		//disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});

	$(".sermon-carousel").each(function (index, el) {
		var owll = $(this),
			items = owll.data('items');

		owll.owlCarousel({
			items: items,
			pagination: true,
			navigation: false,
			navigationText: ["", ""],
			autoplay: true,
			loop: true,
			responsive: {
				0: {
					items: 1,
				},
				960: {
					items: 2,
				},
				1200: {
					items: items,
				}
			}
		});
	});

	$(".sermon-carousel").each(function (index, el) {
		var owll = $(this),
			items = owll.data('items');

		owll.owlCarousel({
			items: items,
			pagination: true,
			navigation: false,
			navigationText: ["", ""],
			autoplay: true,
			loop: true,
			responsive: {
				0: {
					items: 1,
				},
				960: {
					items: 2,
				},
				1200: {
					items: items,
				}
			}
		});
	});
})( jQuery );