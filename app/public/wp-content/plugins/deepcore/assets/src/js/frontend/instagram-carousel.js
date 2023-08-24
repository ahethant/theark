(function ($) {
    $(".owl-carousel-instagram").owlCarousel({
        loop: true,
        margin: 36,
        autoplay: true,
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 3,
                margin: 10,
            },
            768: {
                items: 3,
                margin: 23,
            },
            961: {
                items: 5
            }
        }
    });
})(jQuery);