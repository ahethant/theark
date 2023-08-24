( function( $ ) {
	$( ".w_toggle" ).on('click', function(e) {
        e.preventDefault();

        $( ".w_toparea" ).slideToggle( 400, function(){
            if ( $( ".w_toggle" ).hasClass('open') ) {
                $( ".w_toggle" ).removeClass('open');
            } else {
                $( ".w_toggle" ).addClass('open');
            }
        });
    });
})( jQuery );