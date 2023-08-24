( function( $ ) {
	$('.wn-ftc').find('.wn-ftc-body').hide();
	$('.wn-ftc').find('.wn-ftc-header').on('click', function () {
		$(this).closest('.wn-ftc').find('.wn-ftc-body').slideToggle().toggleClass('open');
		$(this).closest('.wn-ftc').toggleClass('open');
	});
	$('.wn-ftc').find('.wn-ftc-header').find('.ftc-close').on('click', function () {
		$(this).closest('.wn-ftc').fadeOut();
	});
})( jQuery );