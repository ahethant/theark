(function ($) {
	"use strict";
	jQuery(document).ready(function () {
		// Navigation Current Menu
		jQuery('.nav li.current-menu-item, .nav li.current_page_item, #side-nav li.current_page_item, .nav li.current-menu-ancestor, .nav li ul li ul li.current-menu-item , #hamburger-nav li.current-menu-item, #hamburger-nav li.current_page_item, #hamburger-nav li.current-menu-ancestor, #hamburger-nav li ul li ul li.current-menu-item, .full-menu li.current-menu-item, .full-menu li.current_page_item, .full-menu li.current-menu-ancestor, .full-menu li ul li ul li.current-menu-item ').addClass('current');
		jQuery('.nav li ul li:has(ul)').addClass('submenux');
		// Icon Menu Dropdown
		$('.whb-icon-menu-wrap').each(function (index, el) {
			$(this).find('#wn-icon-menu-trigger').on('click', function (event) {
				event.preventDefault();
				$(this).siblings('.whb-icon-menu-content').fadeToggle('fast', function () {
					if ($(".whb-icon-menu-content").is(":visible")) {
						$(document).on('click', function (e) {
							var target = $(e.target);
							if (target.parents('.whb-icon-menu-wrap').length)
								return;
							$(".whb-icon-menu-content").css({
								display: 'none',
							});
						});
					}
				});
			});
		});
	});
})(jQuery);