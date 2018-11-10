Ateles(function () {

    function page_loader(config) {
        var cfg = Object.assign({
            break_at: function () {
                return false;
            }
        }, config);

        if (!cfg.button) {
            return load_pages_with(cfg)();
        }

        cfg.button_all = cfg.button();
        // todo: use vanilla js
        cfg.button_all.css('cursor', 'pointer').click(load_pages_with(cfg));
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function remove_button(cfg) {
        if (cfg.button_all) cfg.button_all.remove();
    }

    function load_pages_with(cfg) {
        var page_num = 1;

        if (!cfg.page_count) return async function () {
            var next_page = cfg.next_page(document);
            while (next_page) {
                var data = await fetch(next_page).then(resp => resp.text());
                next_page = cfg.next_page(data);
                cfg.append_page(data);
                if (cfg.break_at(++page_num)) break;
                if (cfg.interval) await sleep(cfg.interval());
            }
            remove_button(cfg);
        }

        var page_count = cfg.page_count(),
            start_page = (cfg.start_page ? cfg.start_page() : 2);

        if (cfg.interval) return async function () {
            for (var i = start_page; i <= page_count; i++) {
                var next_page = cfg.next_page(i),
                    data = await fetch(next_page).then(resp => resp.text());
                cfg.append_page(data);
                if (cfg.break_at(++page_num)) break;
                await sleep(cfg.interval());
            }

            remove_button(cfg);
        }

        return function () {
            var page_loaders = [];
            for (var i = start_page; i <= page_count; i++) {
                var next_page = cfg.next_page(i);
                var fetcher = fetch(next_page).then(resp => resp.text());
                page_loaders.push(fetcher);
                if (cfg.break_at(++page_num)) break;
            }

            (async function () {
                for (var loader of page_loaders) {
                    var data = await loader;
                    cfg.append_page(data);
                }
            })();

            remove_button(cfg);
        }
    }

    return page_loader;
})