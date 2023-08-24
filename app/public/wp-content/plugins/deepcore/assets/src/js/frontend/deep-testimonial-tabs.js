( function( $ ) {
	$('#wn-testimonial-tab .testimonial-tab-items .testimonial-tabs .testimonial-tab-item:first-child .testimonial-tab-switch').attr('checked', 'checked');

	$('.testimonial-tab-item').find('.testimonial-tab-label').on('click', function () {
		$(this).closest('.testimonial-tabs').find('.testimonial-tab-switch').removeAttr('checked');
		$(this).closest('.testimonial-tab-item').find('.testimonial-tab-switch').attr('checked', 'checked');
	});
})( jQuery );