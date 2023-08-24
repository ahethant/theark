( function( $ ) {
	$('.wpcf7-form').find('.wn-cnform').find('label').on('click', function () {
        $(this).closest('.wn-cnform').find('input , textarea , select').trigger(focus);
    });
    $('.wpcf7-form-control-wrap').find('input , textarea , select').on('focusin', function () {
        var $this = $(this),
            value = $this.val();
        $this.closest('.wn-cnform').addClass('wn-active');
    });
    $('.wpcf7-form-control-wrap').find('input , textarea , select').on('focusout', function () {
        var $this = $(this),
            value = $this.val();
        if (value == '') {
            $(this).closest('.wn-cnform').removeClass('wn-active');
        }
    });
})( jQuery );