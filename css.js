Ateles(function () {
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
        inject(style, true);
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