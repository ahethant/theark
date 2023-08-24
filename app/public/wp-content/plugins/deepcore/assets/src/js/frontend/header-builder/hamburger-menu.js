(function ($) {
	"use strict";
	jQuery(document).ready(function () {
		// Navigation Current Menu
		jQuery('.nav li.current-menu-item, .nav li.current_page_item, #side-nav li.current_page_item, .nav li.current-menu-ancestor, .nav li ul li ul li.current-menu-item , #hamburger-nav li.current-menu-item, #hamburger-nav li.current_page_item, #hamburger-nav li.current-menu-ancestor, #hamburger-nav li ul li ul li.current-menu-item, .full-menu li.current-menu-item, .full-menu li.current_page_item, .full-menu li.current-menu-ancestor, .full-menu li ul li ul li.current-menu-item ').addClass('current');
		jQuery('.nav li ul li:has(ul)').addClass('submenux');

		// Hamburger Menu
		var $hamurgerMenuWrapClone = $('.toggle').find('.hamburger-menu-wrap-cl').clone().remove();
		if ($hamurgerMenuWrapClone.length > 0) {
			$('body').find('.wn-hamuburger-bg').remove();
			$hamurgerMenuWrapClone.appendTo('body');
		}
		if ($('.hamburger-menu-wrap-cl').hasClass('toggle-right')) {
			$('body').addClass('wn-ht whmb-right');
		} else if ($('.hamburger-menu-wrap-cl').hasClass('toggle-left')) {
			$('body').addClass('wn-ht whmb-left');
		}

		// Hamburger Nicescroll
		if ($.fn.niceScroll) {
			$('.hamburger-menu-main').niceScroll({
				scrollbarid: 'whb-hamburger-scroll',
				cursorwidth: "5px",
				autohidemode: true,
			});
		}
		if ($.fn.niceScroll) {
			$('.hamburger-menu-main').on('mouseover', function () {
				$('.hamburger-menu-main').getNiceScroll().resize();
			});
		}
		$('.wn-ht').find('.whb-hamburger-menu.toggle').on('click', '#wn-hamburger-icon', function (event) {
			event.preventDefault();
			if ($(this).closest('.whb-hamburger-menu.toggle').hasClass('is-open')) {
				$(this).closest('.whb-hamburger-menu.toggle').removeClass('is-open');
				$(this).closest('.wn-ht').find('.hamburger-menu-wrap-cl').removeClass('hm-open');
				$(this).closest('.wn-ht').removeClass('is-open');
				if ($.fn.getNiceScroll) {
					$('.hamburger-menu-main').getNiceScroll();
				}
			} else {
				$(this).closest('.whb-hamburger-menu.toggle').addClass('is-open');
				$(this).closest('.wn-ht').find('.hamburger-menu-wrap-cl').addClass('hm-open');
				$(this).closest('.wn-ht').addClass('is-open');
				if ($.fn.getNiceScroll) {
					$('.hamburger-menu-main').getNiceScroll();
				}
			}
		});
		$('#hamburger-nav.toggle-menu').find('li').each(function () {
			var $list_item = $(this);

			if ($list_item.children('ul').length) {
				$list_item.children('a').append('<i class="sl-arrow-down hamburger-nav-icon"></i>');
			}

			$list_item.children('a').children('i').on('click', function (e) {
				e.preventDefault();
				$(this).parents('a').siblings('ul').slideToggle(350, function () {
					if ($list_item.children('a').children('i').hasClass('sl-arrow-up')) {
						$list_item.children('a').children('i').attr('class', 'sl-arrow-down hamburger-nav-icon');
					} else {
						$list_item.children('a').children('i').attr('class', 'sl-arrow-up hamburger-nav-icon');
					}
				});
			})


		});

		// Hamburger Menu Full View
		$('.whb-hamburger-menu.full').find('.whb-icon-element.close-button').on('click', function (e) {
			e.preventDefault();
			if ($(this).siblings('.wn-hamburger-wrap').hasClass('open-menu')) {
				$(this).siblings('.wn-hamburger-wrap').removeClass('open-menu');
				$(this).removeClass('open-button').addClass('close-button').find('.hamburger-icon').removeClass('open');
			} else {
				$(this).siblings('.wn-hamburger-wrap').addClass('open-menu');
				$(this).removeClass('close-button').addClass('open-button').find('.hamburger-icon').addClass('open');
			}
		});

		$('.full-menu').find('li').each(function () {
			var $list_item = $(this);

			if ($list_item.children('ul').length) {
				$list_item.children('a').attr('href', '#');
				$list_item.children('a').append('<i class="sl-arrow-down hamburger-nav-icon"></i>');
			}

			if ($list_item.find('a').first().attr('href') == '#') {
				$list_item.find('a').on('click', function () {
					$(this).siblings('ul').slideToggle(350, function () {
						if ($list_item.children('a').children('i').hasClass('sl-arrow-up')) {
							$list_item.children('a').children('i').attr('class', 'sl-arrow-down hamburger-nav-icon');
						} else {
							$list_item.children('a').children('i').attr('class', 'sl-arrow-up hamburger-nav-icon');
						}
					});
				})
			}
		});

		$(document).on('click', function (e) {
			var target = $(e.target);
			if (e.target.id == 'wn-hamburger-icon' || target.parents('#wn-hamburger-icon').length)
				return;
			var $this = $('body');
			if ($this.hasClass('is-open')) {
				$this.find('.whb-hamburger-menu.toggle').removeClass('is-open');
				$this.removeClass('is-open');
			}
		});

		$(document).on('click', '.hamburger-menu-wrap-cl', function (e) {
			e.stopPropagation();
		});

		// Hamburger menu close
		$('.wn-hamburger-wrap').on('click', function () {
			$('.wn-hamburger-wrap').removeClass('open-menu');

			if ($('.hamburger-icon').hasClass('open')) {
				$('.hamburger-icon').removeClass('open').addClass('close');
			}
		});

		$('#hamburger-nav li').on('click', function () {
			if ($(this).hasClass('menu-item-has-children')) {
				return;
			}
			$('.wn-hamburger-wrap').removeClass('open-menu');
			$('#wn-hamburger-icon .hamburger-icon').removeClass('open');
		});

		const pushContent = $('.whb-hamburger-menu').data('push-content');
		if ( pushContent == true ) {
			$('body').addClass('whb-push-content');
		}

	});
})(jQuery);