// https://greasyfork.org/zh-CN/scripts/372188-ateles
window.Ateles = (function () {
    var base_url = "https://raw.githubusercontent.com/turnon/ateles/master/";

    function parse(name, code) {
        if (this.module_cache(name)) {
            return this.generate();
        }

        var parent = this;

        (new Function("Ateles", code))(function (dep_names, mod_generator) {
            Ateles(dep_names, mod_generator, parent, name);
        });
    }

    function generate(force) {
        if (!force && !this.deps_solved()) {
            return;
        }

        var that = this;
        var mods = this.dep_names
            .map(function (name) {
                return that.module_cache(name);
            });

        this.module_cache(this.self_name, this.mod_generator.apply(null, mods));

        if (this.parent && this.parent.generate) {
            this.parent.generate();
        }
    }

    function deps_solved() {
        var that = this;
        return this.dep_names.every(function (name) {
            return that.module_cache(name);
        })
    }

    function module_cache(name, mod) {
        if (arguments.length === 1) {
            return this.modules_cache[name];
        }
        this.modules_cache[name] = mod;
    }

    function fetcher_cache(name, fetcher) {
        if (arguments.length === 1) {
            return this.fetchers_cache[name];
        }
        this.fetchers_cache[name] = fetcher;
    }

    function require(module_name) {
        var that = this;

        var fetcher = this.fetcher_cache(module_name)
        if (fetcher) {
            return fetcher.then(function (code) {
                that.parse(module_name, code);
            })
        }

        fetcher = fetch(base_url + module_name + ".js")
            .then(function (resp) {
                return resp.text();
            })

        this.fetcher_cache(module_name, fetcher)

        fetcher.then(function (code) {
            that.parse(module_name, code);
        });
    }

    function solve() {
        if (this.deps_solved()) {
            return this.generate(true);
        }

        var that = this;
        this.dep_names.forEach(function (dep_name) {
            that.require(dep_name);
        });
    }

    function new_mod(dep_names, mod_generator, parent, self_name) {
        return {
            self_name: self_name,
            dep_names: dep_names,
            mod_generator: mod_generator,
            modules_cache: parent.modules_cache,
            fetchers_cache: parent.fetchers_cache,
            parent: parent,

            deps_solved: deps_solved,
            module_cache: module_cache,
            fetcher_cache: fetcher_cache,
            require: require,
            parse: parse,
            generate: generate,
            solve: solve
        };
    }

    return function (dep_names, mod_generator, parent, self_name) {
        if (!mod_generator) {
            mod_generator = dep_names;
            dep_names = [];
        }
        self_name = (self_name || "main")
        parent = (parent || {
            modules_cache: {},
            fetchers_cache: {}
        })

        new_mod(dep_names, mod_generator, parent, self_name).solve();
    };
})();