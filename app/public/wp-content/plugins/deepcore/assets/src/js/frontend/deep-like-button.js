( function( $ ) {
    $(document).on('click', '.wn-like-button', function () {
        var button = $(this);
        var post_id = button.attr('data-post-id');
        var security = button.attr('data-nonce');
        var iscomment = button.attr('data-iscomment');
        var allbuttons;
        if (iscomment === '1') {
            allbuttons = $('.wn-like-comment-button-' + post_id);
        } else {
            allbuttons = $('.wn-like-button-' + post_id);
        }
        var loader = allbuttons.next('#wn-like-loader');
        if (post_id !== '') {
            $.ajax({
                type: 'POST',
                url: deep_localize.deep_ajax,
                data: {
                    action: 'process_simple_like',
                    post_id: post_id,
                    nonce: security,
                    is_comment: iscomment,
                },
                beforeSend: function () {
                    loader.html('&nbsp;<div class="loader">Loading...</div>');
                    $('.wn-like-counter').hide();
                },
                success: function (response) {
                    var icon = response.icon;
                    var count = response.count;
                    allbuttons.html(icon + count);
                    if (response.status === 'unliked') {
                        var like_text = deep_localize.like;
                        allbuttons.prop('title', like_text);
                        allbuttons.removeClass('liked');
                    } else {
                        var unlike_text = deep_localize.unlike;
                        allbuttons.prop('title', unlike_text);
                        allbuttons.addClass('liked');
                    }
                    loader.empty();
                    $('.wn-like-counter').show();
                }
            });

        }
        return false;
    });
    $('.wn-lvs-shortcode-wrap .wn-share-shortcode-dropdown a').addClass('hcolorf');
})( jQuery );