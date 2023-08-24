(function ($) {
    var $mega = $('.our-clients-wrap').parents('li.mega');
    $mega.find('.sub-menu').css({
        'visibility': 'hidden',
        'display': 'block',
    });
    $(".our-clients-wrap-carousel").owlCarousel({
        items: 5,
        autoplay: true,
        loop: true,
        dots: false,
        nav: true,
        autoHeight: true,
        navText: ["", "", "", ""],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
            },
            600: {
                items: 2,
                nav: false,
                dots: true,
            },
            1000: {
                items: 6,
                nav: true
            }
        }
    });
    $(".our-clients-type5").owlCarousel({
        items: 6,
        autoPlay: true,
        dots: false,
        nav: true,
        autoHeight: false,
        navText: ["", "", "", ""],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
            },
            600: {
                items: 2,
                nav: false,
                dots: true,
            },
            1000: {
                items: 6,
                nav: true
            }
        }
    });
    var cliNext = jQuery(".our-clients-type6").data('next');
    var cliPre = jQuery(".our-clients-type6").data('pre');
    $(".our-clients-type6").owlCarousel({
        items: 5,
        margin: 50,
        nav: true,
        dots: false,
        autoPlay: true,
        loop: true,
        navText: ["<span class='ol-pre'>" + cliPre + "</span>", "<span class='ol-nxt'>" + cliNext + "</span>", "", ""],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
            },
            600: {
                items: 2,
                nav: false,
                dots: true,
            },
            960: {
                items: 3,
                nav: true,
                dots: false,
            },
            1280: {
                items: 5,
                nav: true,
                dots: false,
                margin: 30,
            }
        }
    });
    $mega.find('.sub-menu').css({
        'visibility': 'visible',
        'display': 'none',
    });
})(jQuery);