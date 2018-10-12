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

    function inject(tag, important) {
        let head = document.head || document.getElementsByTagName('head')[0],
            position = important ? 'beforeend' : 'afterbegin'
        head.insertAdjacentElement(position, tag);
    }

    function text() {
        var css = Array.prototype.slice.call(arguments).join(''),
            style = document.createElement('style');

        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        inject(style);
    }

    function link(css, opt) {
        let link = document.createElement('link'),
            important = opt && opt.important
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = css;
        link.media = 'all';
        inject(link, important);
    }

    return {
        text: text,
        link: link
    };
})