(function ($) {
    /**
     * @param $scope The Widget wrapper element as a jQuery element
     * @param $ The jQuery alias
     */
    var WidgetInfoBoxHandler = function ($scope, $) {
        $scope.each(function (index, element) {
            var $this = $(this),
                $select = $this.find('.infoselect'),
                $showbox = $this.find('.showbox'),
                $first_selected = $select.val();
            $select.niceSelect();
            $showbox.find('.info').hide();
            $showbox.find('.info[id="' + $select.val() + '"]').show();
            $select.change(function () {
                var country = $(this).children("option:selected").val();
                $showbox.find('.info[id="' + country + '"]').show().siblings().hide();
            });
        });
    };

    // Make sure you run this code under Elementor.
    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/info_box.default', WidgetInfoBoxHandler);
    });
})(jQuery);