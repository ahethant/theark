(function ($) {
    $(document).ready(function () {
        $(".testi-carou-4 .testimonial-owl-carousel").owlCarousel({
            items: 1,
            margin: 50,
            nav: false,
            dots: true,
            autoplay: true,
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
                    items: 1,
                    nav: false,
                    dots: true,
                },
                960: {
                    items: 1,
                    nav: false,
                    dots: true,
                },
                1280: {
                    items: 1,
                    nav: false,
                    dots: true,
                }
            }
        });

        $('.testimonial-carousel.testi-carou-4').on('change.owl.carousel changed.owl.carousel', function (e) {
            $('.testimonial-carousel.testi-carou-4 .owl-dots .owl-dot').removeClass('colorb');
            $('.testimonial-carousel.testi-carou-4 .owl-dots .owl-dot.active').addClass('colorb');
        });

        $('.testimonial-owl-carousel').each(function () {
            $(this).owlCarousel({
                items: $(this).data('count'),
                autoplay: true,
                loop: true,
                dots: false,
                nav: true,
                navText: ["", "", "", ""],
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        dots: true,
                        nav: false,
                    },
                    960: {
                        items: $(this).data('count'),
                    },
                }
            });
        });
    });
})(jQuery);