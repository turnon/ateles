Ateles(function () {

    function arguments_to_arr(args) {
        var arg0 = args[0];
        return Array.isArray(arg0) ? arg0 : Array.prototype.slice.call(args);
    }

    function merge2(neo, org) {
        var result = {};
        for (var selector in neo) {
            var old_selector = org[selector],
                new_selector = neo[selector];
            result[selector] = old_selector ? Object.assign(old_selector, new_selector) : new_selector;
        }
        return result;
    }

    function merge() {
        return arguments_to_arr(arguments).reduce(merge2);
    }

    function gen_css() {
        var arg0 = arguments[0];
        var csses = Array.isArray(arg0) ? arg0 : Array.prototype.slice.call(arguments);
        var css = merge(csses),
            css_arr = [];

        for (var selector in css) {
            css_arr.push(selector + ' {');
            var style = css[selector];
            for (var attr in style) {
                refined_attr = attr.replace(/_/g, '-');
                css_arr.push('   ' + refined_attr + ': ' + style[attr] + ';');
            }
            css_arr.push('}');
        }

        return css_arr.join("\n");
    }

    function inject(tag) {
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(atg);
    }

    function text(css) {
        var style = document.createElement('style');
        style.type = 'text/css';

        if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        inject(style);
    }

    function link(css) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = css;
        link.media = 'all';
        inject(link);
    }

    return {
        text: text,
        link: link
    };
})