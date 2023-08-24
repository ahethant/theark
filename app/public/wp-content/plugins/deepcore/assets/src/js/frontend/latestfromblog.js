(function ($) {
	$(".latest-b-carousel").owlCarousel({
		loop: true,
		autoPlay: true,
		nav: false,
		dots: true,
		navText: ["", "", "", ""],
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: true,
				dots: true,
			},
			960: {
				items: 2,
				nav: true,
				dots: true,
			},
			1200: {
				items: $(".latest-b-carousel").attr("data-items"),
				nav: true,
				dots: true,
			}
		}
	});

	$('.latest-b-carousel').find('.col-md-4').removeClass('col-md-4 col-sm-4').end().find('.col-md-3').removeClass('col-md-3 col-sm-3');

	$('.social-count-plus ul li').find('.items span').removeAttr('style');

	$(".latestposts-twenty").owlCarousel({
		items: 1,
		nav: true,
		dots: false,
		autoplay: true,
		loop: true,
		slideSpeed: 600,
		paginationSpeed: 400,
		autoPlay: 6000,
		navText: ["<span class='owl-pree'></span>", "<span class='owl-nxtt'></span>", "", ""],
	});

	$('.latestposts-twenty-seven').find('.click-more-latest-btn').on('click', function (e) {
		e.preventDefault();
		// Variables
		var $this = $(this),
			$wrap = $this.closest('.latestposts-twenty-seven'),
			$items = $wrap.find('.latest-27'),
			half_items = Math.round($items.length / 2);

		for (var i = half_items; i <= $items.length; i++) {

			$($items[i]).slideToggle('slow');
		}
	});

	var $news_ticker = $('#wn-news-ticker');
	if ($news_ticker.length) {
		$('#wn-news-ticker').ticker({
			titleText: '',
			time: 400,
		});
		$('.wn-news-ticker').removeAttr('style');
	}
})(jQuery);