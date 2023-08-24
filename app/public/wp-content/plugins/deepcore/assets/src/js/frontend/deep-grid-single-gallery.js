( function( $ ) {
	if ($('.itemx')) {
        if ($('.tg-item')) {
            var grid_item = $('.single-gallery').find('.tg-item').length;
            $('.itemx').prepend(grid_item + ' ');
        }
    }
})( jQuery );