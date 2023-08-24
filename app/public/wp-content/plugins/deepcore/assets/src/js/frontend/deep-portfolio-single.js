( function( $ ) {
	$(document).ready(function () {
        var portfolio_nav_wrap = $('.wn-portfolio-nav:not(.type-nav1) .wn-portfolio-nav-wrap');
		portfolio_nav_wrap.find('.wn-portfolio-nav-text').find('a').on('hover', function () {
			$(this).closest('.wn-portfolio-nav-wrap').find('.wn-portfolio-nav-content').css({
				opacity: '1',
				visibility: 'visible'
			});
		}, function () {
			$(this).closest('.wn-portfolio-nav-wrap').find('.wn-portfolio-nav-content').css({
				opacity: '0',
				visibility: 'hidden'
			});
		});
    });
})( jQuery );