Ateles(function () {

    function page_loader(config) {
        var button_all = config.button();
        var cfg = Object.assign({
            button_all: button_all
        }, config);

        button_all.css('cursor', 'pointer').click(load_pages_with(cfg));
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function load_pages_with(cfg) {
        if (!cfg.page_count) return async function () {
            var next_page = cfg.next_page(document);
            while (next_page) {
                var data = await fetch(next_page).then(resp => resp.text());
                next_page = cfg.next_page(data);
                cfg.append_page(data);
            }
            cfg.button_all.remove();
        }

        var page_count = cfg.page_count(),
            start_page = (cfg.start_page ? cfg.start_page() : 2);

        if (cfg.interval) return async function () {
            for (var i = start_page; i <= page_count; i++) {
                var next_page = cfg.next_page(i),
                    data = await fetch(next_page).then(resp => resp.text());
                cfg.append_page(data);
                await sleep(cfg.interval());
            }

            cfg.button_all.remove();
        }

        return function () {
            var page_loaders = [];
            for (var i = start_page; i <= page_count; i++) {
                var next_page = cfg.next_page(i);
                var fetcher = fetch(next_page).then(resp => resp.text());
                page_loaders.push(fetcher);
            }

            (async function () {
                for (var loader of page_loaders) {
                    var data = await loader;
                    cfg.append_page(data);
                }
            })();

            cfg.button_all.remove();
        }
    }

    return page_loader;
})