(function($) {

    "use strict";

    /* DROPDOWN CLASS DEFINITION */

    var toggle = '[data-toggle="dropdown"]';
    var share_selector = '.socialshare';
    var fb_iframe = '.socialshare.open[data-type="small-bubbles"] .share-options div.fb-like iframe';
    var $share_container;
    var packaged_html = '' +
    '<div class="dropdown-toggle" data-toggle="dropdown">' +
    '    <div class="share-link"><div>' +
    '        <div class="heart"></div>' +
    '        <p class="text">Share This</p>' +
    '        <div class="caret"><div></div></div></div>' +
    '    </div><div class="clear">' +
    '</div>' +
    '<div class="share-options">' +
    '    <ul>' +
    '        <li><div class="fb-like"></div></li>' +
    '        <li><div class="g-plusone"></div></li>' +
    '        <li><a href="https://twitter.com/share" class="twitter-share-button"></a></li>' +
    '    </ul>' +
    '</div>';
    var type;
    var providers = {
        facebook: {
            id: 'facebook-jssdk',
            src: '//connect.facebook.net/en_US/all.js#xfbml=1&appId=255566051148260',
            selector: '.fb-like',
            'small-bubbles': {
                'data-send': 'false',
                'data-layout': 'button_count',
                'data-width': '105',
                'data-show-face': 'false'
            },
            'bubbles': {
                'data-send': 'false',
                'data-layout': 'box_count',
                'data-width': '12',
                'data-show-faces': 'false'
            },
            'small': {
                'data-send': 'false',
                'data-width': '85',
                'data-show-face': 'false'
            }
        },
        googleplus: {
            id: 'gplus-api',
            src: 'https://apis.google.com/js/plusone.js',
            selector: '.g-plusone',
            'small-bubbles': {
            },
            'bubbles': {
                'data-size': 'tall'
            },
            'small': {
                'data-size': 'small',
                'data-annotation': 'none'
            }
        },
        twitter: {
            id: 'twitter-wjs',
            src: '//platform.twitter.com/widgets.js',
            selector: '.twitter-share-button',
            'small-bubbles': {
                'data-via': 'firefox'
            },
            'bubbles': {
                'data-via': 'firefox',
                'data-count': 'vertical'
            },
            'small': {
                'data-via': 'firefox',
                'data-count': 'none'
            }
        }
    };

    var clear_menus = function() {
        $(toggle).parent().removeClass('open');
    };

    var Dropdown = function(element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle);
        $('html').on('click.dropdown.data-api', function() {
            $el.parent().removeClass('open');
        });
    };

    Dropdown.prototype = {
        constructor: Dropdown,
        scripts_loaded: false,

        toggle: function(e) {
            var $parent = $(this).parent();
            var isActive = $parent.hasClass('open');

            clear_menus();
            if (!isActive) {
                $parent.toggleClass('open');
            }
            $share_container = $(fb_iframe).css('width',
                providers.facebook['small-bubbles']['data-width']);

            Dropdown.prototype.load_sharing();

            return false;
        },
        load_sharing: function() {
            if (!this.scripts_loaded) {
                for (var key in providers) {
                    this.load_script(providers[key].src, providers[key].id);
                }
                this.scripts_loaded = true;
            }
        },
        load_script: function(src, id) {
            var first_js = document.getElementsByTagName("script")[0];
            var js = document.getElementById(id);
            // If the script doesnt exist, create it.
            if (!js) {
                js = document.createElement("script");
                js.id = id;
                first_js.parentNode.insertBefore(js, first_js);
            }
            js.src = src;
        }
    };

    /* DROPDOWN PLUGIN DEFINITION */

    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('dropdown');
            if (!data) {
                $this.data('dropdown', (data = new Dropdown(this)));
            }
            if (typeof option === 'string') {
                data[option].call($this);
            }
        });
    };

    $.fn.dropdown.Constructor = Dropdown;

    /* APPLY TO DROPDOWN ELEMENTS */
    $(function() {
        $('html').on('click.dropdown.data-api', clear_menus);
        $('body').on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle);
        $share_container = $(share_selector);
        var tweetby = $share_container.attr('data-tweet-at');
        if (tweetby) {
            providers['twitter']['small-bubbles']['data-via'] = tweetby;
            providers['twitter']['bubbles']['data-via'] = tweetby;
        }
        $share_container.append(packaged_html);
        for (var key in providers) {
            $share_container.find(providers[key].selector)
                .attr(providers[key][$share_container.attr('data-type')]);
        }
    });
})(window.jQuery);
