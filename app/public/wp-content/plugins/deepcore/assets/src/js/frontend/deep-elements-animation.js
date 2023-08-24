( function( $ ) {
	$(document).ready(function () {
        $('[class^="wn-layer-anim"]').first().addClass('wn-done-anim');
		$('[class^="wn-layer-anim"]').last().addClass('wn-done-anim');
		$(window).on('scroll', function () {
			$('.wn-animation-run:not(.wn-done-anim), .wn-deep-title-wrap:not(.wn-done-anim), .wn-layer-anim-bottom:not(.wn-done-anim), .wn-layer-anim-top:not(.wn-done-anim), .wn-layer-anim-left:not(.wn-done-anim), .wn-layer-anim-right:not(.wn-done-anim), .wn-layer-anim-zoom-in:not(.wn-done-anim), .wn-layer-anim-zoom-out:not(.wn-done-anim), .wn-layer-anim-fade:not(.wn-done-anim), .wn-layer-anim-flip:not(.wn-done-anim), .title-plus-text:not(.wn-done-anim)').each(function (index, element) {
				if (!$(this).hasClass('wn-done-anim')) {
					var offset = $(this).offset(),
						sectionheight = $(this).innerHeight() / 1,
						top = Math.round(offset.top - 500);
					if ($(window).scrollTop() >= top) {
						$(this).addClass('wn-done-anim');
					}
				}
			});
		});
    });
})( jQuery );