(function ($) {
	"use strict";
	$(document).ready(function () {
		const form = $('#loginform');

		form.removeAttr('id');
		form.addClass('loginform');

		// Login Dropdown
		$('.whb-login').each(function (index, el) {
			$(this).find('#wn-login-dropdown-icon').on('click', function (event) {
				$(this).siblings('.w-login').fadeToggle('fast', function () {
					if ($(".w-login").is(":visible")) {
						$(document).on('click', function (e) {
							var target = $(e.target);
							if (target.parents('.whb-login').length)
								return;
							$(".w-login").css({
								display: 'none',
							});
						});
					}
				});
			});
		});
		$('.loginform input[type="text"]').attr('placeholder', 'Username or Email');
		$('.loginform input[type="password"]').attr('placeholder', 'Password');
	});
})(jQuery);