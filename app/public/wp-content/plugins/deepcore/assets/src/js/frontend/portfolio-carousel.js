(function ($) {
    $(".portfolio-carousel").owlCarousel({
        items: 2,
        autoPlay: true,
        dots: false,
        nav: true,
        margin: 90,
        autoWidth: true,
        stagePadding: 30,
        autoHeight: true,
        loop: true,
        navText: ["<span class='ol-pre'></span>", "", "", ""],
    });

    var owl = $("#latest-projects-2");

    owl.owlCarousel({
        items: 4,
        nav: true,
        dots: false,
    });

    // Custom Navigation Events
    $(".latest-projects-navigation .next").on('click', function () {
        owl.find('.owl-next').trigger('click');
    });

    $(".latest-projects-navigation .prev").on('click', function () {
        owl.find('.owl-prev').trigger('click');
    });

    $("#latest-projects").owlCarousel({
        items: 8,
        nav: false,
        dots: true,
        autoPlay: true,
        margin: 10,
        loop: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
                dots: true,
            },
            768: {
                items: 2,
                nav: false,
                dots: true,
            },
            960: {
                items: 4,
                nav: false,
                dots: true,
            },
        }
    });
})(jQuery);