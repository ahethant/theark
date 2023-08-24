(function ($) {
    jQuery('.max-counter').each(function (i, el) {
        var counter = jQuery(el).data('counter');
        if (jQuery(el).visible(true) && !jQuery(el).hasClass('counted')) {
            setTimeout(function () {
                jQuery(el).addClass('counted');
                jQuery(el).find('.max-count').countTo({
                    from: 0,
                    to: counter,
                    speed: 2000,
                    refreshInterval: 100
                });
            }, 1000);
        }
    });
    var win = jQuery(window),
        allMods = jQuery(".max-counter");
    win.on('scroll', function (event) {
        allMods.each(function (i, el) {
            var el = jQuery(el),
                effecttype = el.data('effecttype');
            if (effecttype === 'counter') {
                var counter = el.data('counter');
                if (el.visible(true) && !jQuery(el).hasClass('counted')) {
                    el.addClass('counted');
                    el.find('.max-count').countTo({
                        from: 0,
                        to: counter,
                        speed: 2000,
                        refreshInterval: 100
                    });
                }
            }
        });
    });
    jQuery.fn.countTo = function (options) {
        options = options || {};
        return jQuery(this).each(function () {
            // set options for current element
            var settings = jQuery.extend({}, jQuery.fn.countTo.defaults, {
                from: jQuery(this).data('from'),
                to: jQuery(this).data('to'),
                speed: jQuery(this).data('speed'),
                refreshInterval: jQuery(this).data('refresh-interval'),
                decimals: jQuery(this).data('decimals')
            }, options);
            // how many times to update the value, and how much to increment the value on each update
            var loops = Math.ceil(settings.speed / settings.refreshInterval),
                increment = (settings.to - settings.from) / loops;
            // references & variables that will change with each update
            var self = this,
                $self = jQuery(this),
                loopCount = 0,
                value = settings.from,
                data = $self.data('countTo') || {};
            $self.data('countTo', data);
            // if an existing interval can be found, clear it first
            if (data.interval) {
                clearInterval(data.interval);
            }
            data.interval = setInterval(updateTimer, settings.refreshInterval);
            // initialize the element with the starting value
            render(value);

            function updateTimer() {
                value += increment;
                loopCount++;
                render(value);
                if (typeof (settings.onUpdate) == 'function') {
                    settings.onUpdate.call(self, value);
                }
                if (loopCount >= loops) {
                    // remove the interval
                    $self.removeData('countTo');
                    clearInterval(data.interval);
                    value = settings.to;
                    if (typeof (settings.onComplete) == 'function') {
                        settings.onComplete.call(self, value);
                    }
                }
            }

            function render(value) {
                var formattedValue = settings.formatter.call(self, value, settings);
                $self.html(formattedValue);
            }
        });
    };
    jQuery.fn.countTo.defaults = {
        from: 0, // the number the element should start at
        to: 0, // the number the element should end at
        speed: 1000, // how long it should take to count between the target numbers
        refreshInterval: 100, // how often the element should be updated
        decimals: 0, // the number of decimal places to show
        formatter: formatter, // handler for formatting the value before rendering
        onUpdate: null, // callback method for every time the element is updated
        onComplete: null // callback method for when the element finishes updating
    };

    function formatter(value, settings) {
        return value.toFixed(settings.decimals);
    };
})(jQuery);