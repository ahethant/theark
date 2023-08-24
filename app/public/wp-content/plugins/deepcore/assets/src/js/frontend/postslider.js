(function ($) {
	$(document).ready(function () {
		// Post slider type 1
		$(".postslider-owl-carousel.postslider-1").owlCarousel({
			items: 1,
			autoPlay: true,
			dots: false,
			nav: true,
			loop: true,
			autoplay: true,
			autoplayHoverPause: true,
			navText: ["", "", "", ""],
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true,
				},
				600: {
					items: 1,
					nav: true,
				},
				1000: {
					items: 1,
					nav: true,
				}
			}
		});

		// Post slider type 2
		$(".postslider-owl-carousel.postslider-2").owlCarousel({
			stagePadding: 340,
			loop: true,
			margin: 182,
			nav: true,
			dots: false,
			responsive: {
				0: {
					items: 1,
					nav: true,
					margin: 15,
					stagePadding: 0,
				},
				960: {
					items: 1,
					nav: true,
					margin: 50,
					stagePadding: 100,
				},
				1024: {
					items: 1,
					nav: true,
					margin: 75,
					stagePadding: 150,
				},
				1280: {
					items: 1,
					nav: true,
				}
			}
		});

		// Post slider type 3
		$(".postslider-owl-carousel.postslider-3").owlCarousel({
			items: 1,
			autoPlay: true,
			dots: true,
			nav: false,
			loop: true,
			autoplay: true,
			autoplayHoverPause: true,
			navText: ["", "", "", ""],
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
					nav: true,
				},
				600: {
					items: 1,
					nav: true,
				},
				1000: {
					items: 1,
					nav: true,
				}
			}
		});

		// Post slider type 4
		$(".postslider-owl-carousel.postslider-4").owlCarousel({
			center: true,
			items: 2,
			loop: true,
			margin: 0,
			nav: true,
			autoplay: true,
			autoplayTimeout: 6000,
			dots: false,
			navText: ['<i class="ps-icon-left"></i>', '<i class="ps-icon-right"></i>'],
			responsive: {
				0: {
					items: 1,
				},
				768: {
					items: 3,
				},
				1100: {
					items: 2,
					center: true,
				}
			}
		});

		$('.postslider-owl-carousel.postslider-4').owlCarousel({
			thumbs: true,
			thumbImage: false,
			thumbsPrerendered: true,
			thumbContainerClass: 'owl-thumbs',
			thumbItemClass: 'owl-thumb-item',
		});
	});
})(jQuery);