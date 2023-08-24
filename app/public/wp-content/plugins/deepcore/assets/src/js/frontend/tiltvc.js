"use strict";

(function ($) {
    jQuery(document).ready(function () {
        $('.wniconbx-tilt').each(function (index, element) {
            var $this = $(this),
                datas = $this.data();
        
            $(this).tilt({
                glare: true,
                maxGlare: .5,
            });
        });
    });
})(jQuery);