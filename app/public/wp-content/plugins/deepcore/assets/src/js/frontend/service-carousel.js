(function ($) {
    var owl = $('.our-service-carousel-wrap'),
        items = owl.data('items');

    $(".our-service-carousel-wrap").owlCarousel({
        items: items,
        autoplay: true,
        nav: false,
        dots: true,
        navText: ["", ""],
        479: {
            item: 1,
        },
        960: {
            item: 2,
        },
        1200: {
            item: 3,
        }
    });
})(jQuery);