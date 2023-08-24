(function ($) {
	/**
 	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */
    var WidgetTabContentHandler = function ($scope, $) {

        $('.deep-tab-content').each(function () {
            var $tabWrapper = $(this);
            var $tabMenu = $tabWrapper.find('.tab-menu');
            var $tabContent = $tabWrapper.find('.tab-content');

            $tabMenu.children().first().addClass('active');

            $tabMenu.children('li').on('click', function () {
                var $this = $(this);
                var dataID = $this.data('id');                

                $tabContent.hide();
                $tabMenu.children('li').removeClass('active');

                $this.addClass('active');
                $tabWrapper.find('#' + dataID).fadeIn(400);
            });
        });
    };

    // Make sure you run this code under Elementor.
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/Tabs.default', WidgetTabContentHandler);
    });
})(jQuery);