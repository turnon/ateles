// https://greasyfork.org/zh-CN/scripts/372188-ateles
// https://github.com/turnon/ateles
// eval(await fetch('https://raw.githubusercontent.com/turnon/ateles/master/ateles.js').then(d => d.text()))
window.Ateles = (function () {
    var branch = 'master',
        repo = 'https://raw.githubusercontent.com/turnon/ateles/',
        base_url = repo + branch + '/';

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

        var mod = this.mod_generator.apply(null, mods);
        var cache_and_call_parent = _cache_and_call_parent(this);

        if (mod && (typeof mod.then === 'function')) {
            return mod.then(cache_and_call_parent)
        }
        cache_and_call_parent(mod)
    }

    function _cache_and_call_parent(that) {
        return function (mod) {
            that.module_cache(that.self_name, mod);
            that.parent && that.parent.generate && that.parent.generate();
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

    function ateles(dep_names, mod_generator, parent, self_name) {
        if (!mod_generator) {
            mod_generator = dep_names;
            dep_names = [];
        }

        dep_names = Array.isArray(dep_names) ? dep_names : [dep_names];
        self_name = (self_name || "main")
        parent = (parent || {
            modules_cache: {},
            fetchers_cache: {}
        })

        new_mod(dep_names, mod_generator, parent, self_name).solve();
    }

    ateles.branch = function (name) {
        base_url = repo + name + '/';
    }

    return ateles;
})();