Ateles(function () {

    function page_loader(config) {
        var button_all = config.button();
        var cfg = Object.assign({
            button_all: button_all
        }, config);

        button_all.css('cursor', 'pointer').click(load_pages_with(cfg));
    }

    function load_pages_with(cfg) {
        return function () {
            var page_count = cfg.page_count();

            var page_loaders = [];
            for (var i = 2; i <= page_count; i++) {
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