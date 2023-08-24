(function ($) {
	/**
     * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */
    var WidgetIconBoxHandler = function ($scope, $) {
        $('.wniconbx-tilt').each(function (index, element) {
            var $this = $(this),
                datas = $this.data();

            $(this).tilt({
                glare: true,
                maxGlare: .5,
            });
        });
    };
    
    // Make sure you run this code under Elementor.
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/iconbox.default', WidgetIconBoxHandler);
    });
})(jQuery);