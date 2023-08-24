(function ($) {
    $(document).ready(function () {
        var ts_mono = $('.testimonial-slider-owl-carousel.ts-mono');
        ts_mono.owlCarousel({
            items: 1,
            dots: true,
            nav: false,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
        });

        var ts_di = $('.testimonial-slider-owl-carousel.ts-di');
        ts_di.owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
        });

        var ts_tri = $('.testimonial-slider-owl-carousel.ts-tri');
        ts_tri.owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
        });

        var ts_tetra = $('.testimonial-slider-owl-carousel.ts-tetra');
        ts_tetra.owlCarousel({
            items: 1,
            dots: true,
            nav: true,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    dots: true,
                },
                480: {
                    items: 1,
                    nav: true,
                    dots: true,
                },
            },
        });

        var ts_penta = $('.testimonial-slider-owl-carousel.ts-penta');
        ts_penta.owlCarousel({
            items: 1,
            dots: true,
            nav: false,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
        });

        var ts_hexa = $('.testimonial-slider-owl-carousel.ts-hexa');
        ts_hexa.owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
        });

        var ts_hepta = $('.testimonial-slider-owl-carousel.ts-hepta');
        ts_hepta.owlCarousel({
            items: 1,
            dots: true,
            nav: false,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
        });

        var ts_octa = $('.testimonial-slider-owl-carousel.ts-octa');
        ts_octa.owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    dots: true,
                },
                480: {
                    items: 1,
                    nav: true,
                    dots: false,
                },
            },
        });

        var ts_nona = $('.testimonial-slider-owl-carousel.ts-nona');
        ts_nona.owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            loop: true,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            navText: ["<span class='ol-pre'></span>", "<span class='ol-nxt'></span>", "", ""],
        });

        var ts_deca = $('.testimonial-slider-owl-carousel.ts-deca');
        ts_deca.owlCarousel({
            items: 1,
            dots: false,
            nav: true,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["<span class='ol-pre'></span>", "<span class='ol-nxt'></span>", "", ""],
        });

        var ts_undeca = $('.testimonial-slider-owl-carousel.ts-undeca');
        ts_undeca.owlCarousel({
            items: 1,
            dots: true,
            nav: false,
            autoplay: true,
            slideSpeed: 600,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
            margin: 50,
        });
        ts_undeca.on('change.owl.carousel changed.owl.carousel', function (e) {
            ts_undeca.find('.owl-dots .owl-dot').removeClass('colorb');
            ts_undeca.find('.owl-dots .owl-dot.active').addClass('colorb');
        });

        var ts_dodeca = $('.testimonial-slider-owl-carousel.ts-dodeca');
        ts_dodeca.owlCarousel({
            items: 1,
            dots: true,
            nav: false,
            autoplay: true,
            slideSpeed: 1000,
            paginationSpeed: 400,
            autoPlay: 6000,
            loop: true,
            navText: ["", ""],
        });
    });
})(jQuery);