function Ateles(module_names, fn) {
    var base_url = 'https://raw.githubusercontent.com/turnon/ateles/master/'

    function pick(name) {
        var mod = Ateles.cache[name]
        if (mod) {
            return mod
        }

        var request = new XMLHttpRequest();
        var url = base_url + name + '.js';
        request.open('GET', url, false);
        request.send(null);

        if (request.status === 200) {
            mod = (new Function('Ateles', request.responseText))(Ateles);
            Ateles.cache[name] = mod;
            return mod;
        }
    }

    var modules = module_names.map(function (name) {
        return pick(name)
    });

    return fn.apply(null, modules)
}

Ateles.cache = {}