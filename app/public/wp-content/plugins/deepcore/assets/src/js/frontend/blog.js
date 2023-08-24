( function( $ ) {
	var $ajax_btn = $('.wn-loadmore-ajax'),
		site_url = $ajax_btn.data('site-url'),
		current_page = $ajax_btn.data('current-page'),
		max_page_num = $ajax_btn.data('max-page-num'),
		total_posts = $ajax_btn.data('total'),
		post_pre_page = $ajax_btn.data('post-pre-page'),
		no_more_post = $ajax_btn.data('no-more-post');

	if (current_page == '') {
		current_page = '1';
		$ajax_btn.attr('data-current-page', current_page);
	}

	if (current_page < max_page_num) {
		$('.wn-loadmore-ajax a').on('click', function (e) {
			e.preventDefault();
			if (current_page < max_page_num) {
				current_page++
				$ajax_btn.find('a').attr('href', site_url + '/page/' + current_page + '/');
				$ajax_btn.attr('data-current-page', current_page);

				var link = $(this).attr('href'),
					$preloader = $('<div class="wn-circle-side-wrap"><div data-loader="wn-circle-side"></div></div>');

				$preloader.appendTo($(this));

				$.get(link, function (data) {
					var post = $(".wn-blog-ajax", data);
					$('.wn-loadmore-ajax').before(post);
					$preloader.remove();
					// run social share 5
					if ($('tline-box'.length > 0)) {
						$('.blog-social-5').find('.more-less').children('.less').hide();
						$('.blog-social-5').find('.linkedin, .email').hide();
						$('.blog-social-5').find('a.more-less').on('click', function (e) {

							e.preventDefault();
							$(this).closest('.blog-social-5').find('.linkedin, .email').slideToggle('400');
							$(this).closest('.blog-social-5').find('.more-less').children('.more').slideToggle(400);
							$(this).closest('.blog-social-5').find('.more-less').children('.less').slideToggle(400);
						});
					}
				});
			}
		});
	}

	$(window).on('load', function () {
		if ( $('#pin-content').length && typeof masonry === 'function' ) {
			$('#pin-content').masonry({
				itemSelector: '.pin-box',
			}).imagesLoaded(function () {
				$('#pin-content').data('masonry');
			});
		}
	});

	if ($('body').find('.blog-post').length > 0) {
		$('body').addClass('blog-pg-w');
	}

	$(document).ready(function () {
		if ($('.single').find('.post-sharing-3').length) {

			$(window).on('scroll', function () {

				var scroll_top = $(window).scrollTop();

				$('.blog-social-3').toggleClass('active', scroll_top >= $('.type-post').offset().top);
				$('.blog-social-3').toggleClass('deactive', scroll_top >= $('.post-sharing').offset().top);

			});
			$(window).trigger('scroll');
		}

		$('.blog-social-5').find('.more-less').children('.less').hide();
		$('.blog-social-5').find('.linkedin, .email').hide();

		$('.blog-social-5').find('a.more-less').on('click', function (e) {
			e.preventDefault();

			$(this).closest('.blog-social-5').find('.linkedin, .email').slideToggle('400');
			$(this).closest('.blog-social-5').find('.more-less').children('.more').slideToggle(400);
			$(this).closest('.blog-social-5').find('.more-less').children('.less').slideToggle(400);
		});
	});
})( jQuery );