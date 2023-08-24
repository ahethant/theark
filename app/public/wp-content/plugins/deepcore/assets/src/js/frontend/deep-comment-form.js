( function( $ ) {
	$(document).ready(function () {
        $('.comment-form').find('p').not('.form-submit').find('input,textarea').on('focus', function () {
            var $this = $(this);
            $('.comment-form').find('p').removeClass('wn-active');
            $this.closest('p').addClass('wn-active wn-focus-active');
        });
    });
})( jQuery );