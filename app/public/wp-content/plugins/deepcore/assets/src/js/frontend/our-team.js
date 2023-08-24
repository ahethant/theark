( function( $ ) {
    $('.ourteam-owl-carousel-type9').owlCarousel({
        center: true,
        items: 3,
        loop: true,
        nav: true,
        touchDrag: false,
        mouseDrag: false,
        navText: ["", ""],
        prevText: ["", ""],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                center: false,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                items: 2,
                nav: false,
                center: false,
                margin: 40,
                touchDrag: true,
                mouseDrag: true,
            },
            1200: {
                items: 3,
                nav: false,
                center: false,
                margin: 40,
                touchDrag: true,
                mouseDrag: true,
            },
            1441: {
                items: 3,
                nav: true,
                center: true,
                margin: 60,
                touchDrag: false,
                mouseDrag: false,
            }
        }

    });

    $('.ourteam-owl-carousel-type9 .center').prev().addClass("after");
    $('.ourteam-owl-carousel-type9 .center').next().addClass("before");

    $('.ourteam-owl-carousel-type9.owl-carousel').on('change.owl.carousel changed.owl.carousel', function (e) {
        if (e.property.name != 'position') return;

        var current = e.relatedTarget.current()
        var items = $(this).find('.owl-stage').children()
        var add = e.type == 'changed'

        items.eq(e.relatedTarget.normalize(current + 1)).toggleClass('before', add)
        items.eq(e.relatedTarget.normalize(current - 1)).toggleClass('after', add)
        $('.ourteam-owl-carousel-type9 .center').prev().removeClass("after");
        $('.ourteam-owl-carousel-type9 .center').next().removeClass("before");

        $(window).on('load', function () {
            var viewportWidth = $(window).width();
            if (viewportWidth > 1200) {
                $(".ourteam-owl-carousel-type9").removeClass("before");
                $(".ourteam-owl-carousel-type9").removeClass("after");
            }
        });
    });

    $(".ourteam-owl-carousel-type10").owlCarousel({
        items: 4,
        margin: 45,
        loop: true,
        autoPlay: true,
        dots: false,
        nav: true,
        navText: ["<span class='ol-pre'>PRE</span>", "<span class='ol-nxt'>NXT</span>", "", ""],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                dots: false,
            },
            600: {
                items: 2,
                nav: true,
                dots: false,
            },
            960: {
                items: 3,
                nav: true,
                dots: false,
            },
            1600: {
                items: 3,
                nav: true,
                dots: false,
            }
        }
    });
} )( jQuery );