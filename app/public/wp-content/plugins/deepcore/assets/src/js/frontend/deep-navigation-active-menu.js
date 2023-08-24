( function( $ ) {
    var $window = $(window),
    nav_wrap = $('.whb-nav-wrap'),
    nav_height = $('.whb-nav-wrap').outerHeight();

    nav_wrap.find('.nav').find('a').each(function () {

        var $this = $(this), // $(this) = .nav a
            href = $this.attr('href');
        if (href && href.indexOf('#') !== -1 && href != '#') {

            var id = href.substring(href.indexOf('#')),
                section = $(id);
            if (section.length > 0) {
                $window.on('resize scroll', function () {

                    var section_top = section.offset().top - nav_height,
                        section_height = section.outerHeight();
                    if ($window.scrollTop() >= section_top && $window.scrollTop() < (section_top + section_height)) {
                        $this.parent().siblings().removeClass('current').end().addClass('current');
                    }
                });
            }
        }
    });
})( jQuery );