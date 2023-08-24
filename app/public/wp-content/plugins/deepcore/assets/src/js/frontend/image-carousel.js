(function ($) {
    // Webnus Image Carousel 1
    $(".w-image-carousel").owlCarousel({
        items: $(".w-image-carousel").data('items'),
        autoplay: true,
        autoplayTimeout: 2000,
        nav: false,
        dots: false,
        navText: ["", ""],
        loop: true,
    });

    // Webnus Image Carousel 2
    $(".w-image-carousel-type2").owlCarousel({
        center: true,
        loop: true,
        autoplay: true,
        items: 1,
        nav: true,
        dots: true,
        autoplayHoverPause: true,
        animateOut: 'slideOutUp',
        animateIn: 'slideInUp',
        mouseDrag: false,
        navText: ["<span class='ol-pre'></span>", "<span class='ol-nxt'></span>", "", ""],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    });

    $('.w-image-carousel-type2 .center').prev().addClass("after");
    $('.w-image-carousel-type2 .center').next().addClass("before");
    var wh = $(".w-image-carousel-type2 .owl-stage-outer .active img").height();
    var totalItems = $(".w-image-carousel-type2 .owl-stage-outer").find('.owl-item').not('.cloned').length;
    var result = parseInt(wh, 10) / parseInt(totalItems, 10);
    $('.w-image-carousel-type2 .owl-dots .owl-dot').css('height', result);
    $('.w-image-carousel-type2').on('changed.owl.carousel', function (e) {
        if (e.property.name != 'position') return;
        var current = e.relatedTarget.current()
        var items = $(this).find('.owl-stage').children()
        var add = e.type == 'changed'

        items.eq(e.relatedTarget.normalize(current + 1)).toggleClass('before', add)
        items.eq(e.relatedTarget.normalize(current - 1)).toggleClass('after', add)
        $('.w-image-carousel-type2 .center').prev().removeClass("after");
        $('.w-image-carousel-type2 .center').next().removeClass("before");

        var whh = items.eq(e.relatedTarget.normalize(current)).height();
        var totalItemss = $(".w-image-carousel-type2 .owl-stage-outer").find('.owl-item').not('.cloned').length;
        var resultt = parseInt(whh, 10) / parseInt(totalItemss, 10);
        $('.w-image-carousel-type2 .owl-dots .owl-dot').css('height', resultt);
    });

    // Webnus Image Carousel 3,4
    $(".w-image-carousel-type3,.w-image-carousel-type4").owlCarousel({
        center: true,
        loop: true,
        autoplay: true,
        items: 1,
        nav: true,
        dots: false,
        autoplayHoverPause: true,
        animateOut: 'slideOutUp',
        animateIn: 'slideInUp',
        mouseDrag: false,
        navText: ["<span class='ol-pre'></span>", "<span class='ol-nxt'></span>", "", ""],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            }
        }
    });
})(jQuery);