( function( $ ) {
	$('.wn-category-wrap').each(function () {

		var $this = $(this),
			slice_post_temp = 0,
			slice_post = 4,
			$posts = $this.find('.wn-category-posts').children('.wn-category-tab'),
			total_posts = $posts.length,
			data_name = $this.find('.wn-category-posts').attr('data-cat-slug'),
			$wrap = $this.find('.wn-category-posts[data-cat-slug="' + data_name + '"]');

		if (total_posts > 4) {

			var $next_btn = $this.find('.pagination').find('a[data-type="next"]'),
				$prev_btn = $this.find('.pagination').find('a[data-type="previous"]');

			$wrap.find('.wn-category-tab.active').slice(slice_post).removeClass('active');

			$next_btn.on('click', function () {


				slice_post_temp = slice_post_temp + 4;
				slice_post = slice_post + 4;

				$wrap.find('.wn-category-tab.active').slice(slice_post_temp, slice_post).removeClass('active');
				$wrap.find('.wn-category-tab').slice(slice_post_temp, slice_post).addClass('active');

			});
		}

	});

	// Category tab
	$('.wn-category-tab-nav').find('li').on('mouseenter', function () {

		// variables
		var $this = $(this),
			cat_slug_list = $this.data('cat-slug'),
			$active_menu = $this.find('a'),
			$posts_wrap = $this.closest('.wn-category-wrap').find('.wn-category-posts');

		// menu switcher
		$this.addClass('active').siblings().removeClass('active');
		$this.find('a').addClass('colorf').closest('li').siblings().find('a').removeClass('colorf');

		// filtering on hover
		if (cat_slug_list !== 'all') {

			$posts_wrap.find('.wn-category-tab').removeClass('active');
			$posts_wrap.find('.wn-category-tab[data-cat-slug="' + cat_slug_list + '"]').addClass('active');

		} else if (cat_slug_list === 'all') {

			$posts_wrap.find('.wn-category-tab').addClass('active');

		}

		$posts_wrap.attr('data-cat-slug', cat_slug_list);

	});
})( jQuery );