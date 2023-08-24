( function( $ ) {
	$('.process-carousel').owlCarousel({
		items: 1,
		dots: false,
		nav: true,
		autoplay: false,
		slideSpeed: 600,
		paginationSpeed: 400,
		autoPlay: 6000,
		navText: ["<span id='process-carousel' class='ol-pre'></span>", "<span id='process-carousel' class='ol-nxt'></span>", "", ""],
	});

	$('.process-carousel').each(function (index, el) {
		var totalItems = $(this).find('.owl-item').length;
		if (totalItems > 0 && totalItems < 10) {
			totalItems = '0' + totalItems;
		}
		var currentIndex = $(this).find('.owl-item.active').index() + 1;
		if (currentIndex > 0 && currentIndex < 10) {
			currentIndex = '0' + currentIndex;
		}
		$(this).parent().find('.process-carousel-num').html('' + currentIndex + '/' + totalItems + '');

		$(this).find('#process-carousel').owlCarousel({
			interval: 2000
		});

		$(this).on('changed.owl.carousel', function (event) {
			var currentIndex = event.item.index + 1;
			if (currentIndex > 0 && currentIndex < 10) {
				currentIndex = '0' + currentIndex;
			}
			$(this).siblings('.process-carousel-num').html('' + currentIndex + '/' + totalItems + '');
		});
	});
})( jQuery );