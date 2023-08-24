( function( $ ) {
	if ($('.wn-social-login').length >= 1) {
		$('.wn-social-login').find('i.theChampLogin').each(function () {
			var $this = $(this),
				social_contnet = $this.attr('alt');
			$this.after('<p class="social-text">' + social_contnet + '</p>');
		});
		if (('.social-text').length >= 1) {
			$('.wn-social-login').find('.social-text').on('click', function () {
				$(this).closest('li').find('i.theChampLogin').trigger('click');
			});
		}
	}
})( jQuery );