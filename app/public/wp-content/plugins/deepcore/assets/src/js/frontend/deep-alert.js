( function( $ ) {
	$(".alert .close").on('click', function () {
		$(this).closest('.alert').fadeOut("normal", function () {
			$(this).remove();
		});
	});
})( jQuery );