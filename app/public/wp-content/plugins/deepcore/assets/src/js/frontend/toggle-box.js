( function( $ ) {
	$(document).ready(function () {
		var $single_room = $('.suite-toggle');

		$single_room.find('.extra-content').hide();

		$(document).on('click', '.suite-toggle .toggle-content .ti-plus', function () {
			$(this).parent().parent().find('.extra-content').show(300);
			$(this).closest('.suite-toggle').addClass('click');
			$(this).removeClass('ti-plus').addClass('ti-minus');
		});

		$(document).on('click', '.suite-toggle .toggle-content .ti-minus', function () {
			$(this).parent().parent().find('.extra-content').hide(300);
			$(this).closest('.suite-toggle').removeClass('click');
			$(this).removeClass('ti-minus').addClass('ti-plus');
		})

		$(document).on('click', '.offer-toggle .toogle-plus .ti-plus', function () {
			$(this).parent().parent().find('.toggle-content').show(300);
			$(this).removeClass('ti-plus').addClass('ti-minus');
		});
		$(document).on('click', '.offer-toggle .toogle-plus .ti-minus', function () {
			$(this).parent().parent().find('.toggle-content').hide(300);
			$(this).removeClass('ti-minus').addClass('ti-plus');
		});
	});
})( jQuery );