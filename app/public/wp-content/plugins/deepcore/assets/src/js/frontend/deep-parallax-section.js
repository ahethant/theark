( function( $ ) {
    $(document).ready(function () {
        $('.wn-parallax').each(function () {
            var $this = $(this),
                parallax_bg = $this.css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
            $this.find('.wn-parallax-bg').css('background-image', 'url(' + parallax_bg + ')');
        });

        function wn_start_parallax() {
            $('.wn-parallax').each(function () {
                var $this = $(this),
                    window_innerheight = window.innerHeight,
                    section_height = $this.outerHeight(),
                    wn_parallax_el = $this[0],
                    bounding_client = wn_parallax_el.getBoundingClientRect(),
                    $wn_parallax_bgholder = $this.find('.wn-parallax-bg-holder'),
                    wn_parallax_bgholder_el = $this.find('.wn-parallax-bg-holder')[0];

                var vertical_offset = (bounding_client.top < 0 || bounding_client.height > window_innerheight) ? (bounding_client.top / bounding_client.height) : bounding_client.bottom > window_innerheight ? ((bounding_client.bottom - window_innerheight) / bounding_client.height) : 0,
                    parallax_speed = $wn_parallax_bgholder.data('wnparallax-speed');

                vertical_offset = -(vertical_offset * parallax_speed);
                TweenMax.set(wn_parallax_bgholder_el, {
                    force3D: 'true',
                    y: vertical_offset
                });
            });
        }

        window.addEventListener('scroll', function () {
            window.requestAnimationFrame(wn_start_parallax);
        }, false);

        wn_start_parallax();
    });
})( jQuery );