Ateles(_ => {

    return function (opt) {
        (function when_changed(opt) {
            let content = Array.from(document.querySelectorAll(opt.selector)).map(e => e.innerHTML).join('')

            if (opt.o_content !== content) {
                opt.callback()
            }

            setTimeout(when_changed, opt.interval, {
                selector: opt.selector,
                callback: opt.callback,
                o_content: content
            })
        })(opt)
    }
})