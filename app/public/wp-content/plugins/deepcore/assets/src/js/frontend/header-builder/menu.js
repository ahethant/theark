(function ($) {
	"use strict";
	jQuery(document).ready(function () {
		// Navigation Current Menu
		jQuery('.nav li.current-menu-item, .nav li.current_page_item, #side-nav li.current_page_item, .nav li.current-menu-ancestor, .nav li ul li ul li.current-menu-item , #hamburger-nav li.current-menu-item, #hamburger-nav li.current_page_item, #hamburger-nav li.current-menu-ancestor, #hamburger-nav li ul li ul li.current-menu-item, .full-menu li.current-menu-item, .full-menu li.current_page_item, .full-menu li.current-menu-ancestor, .full-menu li ul li ul li.current-menu-item ').addClass('current');
		jQuery('.nav li ul li:has(ul)').addClass('submenux');
		// Responsive Menu
		$('.whb-responsive-menu-icon-wrap').on('click', function () {
			var $toggleMenuIcon = $(this),
				uniqid = $toggleMenuIcon.data('uniqid'),
				$responsiveMenu = $('.whb-responsive-menu-wrap[data-uniqid="' + uniqid + '"]'),
				$closeIcon = $responsiveMenu.find('.close-responsive-nav');

			if ($responsiveMenu.hasClass('open') === false) {
				$toggleMenuIcon.addClass('open-icon-wrap').children().addClass('open');
				$closeIcon.addClass('open-icon-wrap').children().addClass('open');
				$responsiveMenu.animate({
					'left': 0
				}, 350).addClass('open');
			} else {
				$toggleMenuIcon.removeClass('open-icon-wrap').children().removeClass('open');
				$closeIcon.removeClass('open-icon-wrap').children().removeClass('open');
				$responsiveMenu.animate({
					'left': -265
				}, 350).removeClass('open');
			}
		});
		$('.whb-responsive-menu-wrap').each(function () {
			var $this = $(this),
				uniqid = $this.data('uniqid'),
				$responsiveMenu = $this.clone(),
				$closeIcon = $responsiveMenu.find('.close-responsive-nav'),
				$toggleMenuIcon = $('.whb-responsive-menu-icon-wrap[data-uniqid="' + uniqid + '"]');

			// append responsive menu to webnus header builder wrap
			$this.remove();
			$('#webnus-header-builder').append($responsiveMenu);

			// add arrow down to parent menus
			$responsiveMenu.find('li.menu-item-has-children, li.mega').each(function () {
				var $list_item = $(this);

				if ($list_item.children('ul').length) {
					$list_item.children('a').append('<i class="sl-arrow-right respo-nav-icon"></i>');
				}

				/* trigger on a custom link */
				if ($list_item.hasClass('menu-item-has-children') || $list_item.hasClass('mega')) {
					$list_item.children('a').children('i').on('click', function (e) {
						e.preventDefault();
						$list_item.children('ul').slideToggle(350,
							function () {
								if ($list_item.children('a').children('i').hasClass('sl-arrow-down')) {
									$list_item.children('a').children('i').attr('class', 'sl-arrow-right respo-nav-icon');
								} else {
									$list_item.children('a').children('i').attr('class', 'sl-arrow-down respo-nav-icon');
								}
							}
						);
					});
				}
			});

			// close responsive menu
			$closeIcon.on('click', function () {
				if ($toggleMenuIcon.hasClass('open-icon-wrap')) {
					$toggleMenuIcon.removeClass('open-icon-wrap').children().removeClass('open');
					$closeIcon.removeClass('open-icon-wrap').children().removeClass('open');
				} else {
					$toggleMenuIcon.addClass('open-icon-wrap').children().addClass('open');
					$closeIcon.addClass('open-icon-wrap').children().addClass('open');
				}

				if ($responsiveMenu.hasClass('open') === true) {
					$responsiveMenu.animate({
						'left': -265
					}, 350).removeClass('open');
				}
			});
		});
	});
})(jQuery);