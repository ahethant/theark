( function( $ ) {
	function wn_resize_video_background($element) {
        var iframeW,
            iframeH,
            marginLeft,
            marginTop,
            containerW = $element.innerWidth(),
            containerH = $element.innerHeight(),
            ratio1 = 16,
            ratio2 = 9;

        if ((containerW / containerH) < (ratio1 / ratio2)) {
            iframeW = containerH * (ratio1 / ratio2);
            iframeH = containerH;

            marginLeft = -Math.round((iframeW - containerW) / 2) + 'px';
            marginTop = -Math.round((iframeH - containerH) / 2) + 'px';

            iframeW += 'px';
            iframeH += 'px';
        } else {
            iframeW = containerW;
            iframeH = containerW * (ratio2 / ratio1);

            marginTop = -Math.round((iframeH - containerH) / 2) + 'px';
            marginLeft = -Math.round((iframeW - containerW) / 2) + 'px';

            iframeW += 'px';
            iframeH += 'px';
        }

        $element.find('.vc_video-bg video').css({
            maxWidth: '1000%',
            marginLeft: marginLeft,
            marginTop: marginTop,
            width: iframeW,
            height: iframeH
        });
    }

    $('.wn_video-bg-container, .video-background-wrap').each(function () {
        var $this = $(this);
        wn_resize_video_background($this);
        jQuery(window).on('resize', function () {
            wn_resize_video_background($this);
        });
    });

    var screen = $(window).width();
    if (screen <= 768) {
        $('.video-background-wrap').find('.video-wrap').remove();
    }
})( jQuery );