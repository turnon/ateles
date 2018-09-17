// https://purecss.io/menus/
Ateles(['pure_css'], function () {
    return function menu() {
        var args = Array.prototype.slice.call(arguments),
            opt = args.pop(),
            lists = args;

        // opt = opt || {};
        // opt = Object.assign({
        //     horizontal: {}
        // }, opt);

        var menu = [
            '<div class="pure-menu pure-menu-horizontal">', "\n",
            '<ul class="pure-menu-list">', "\n",
            '<li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">'
        ];

        menu.push('<a href="#" class="pure-menu-link">');
        menu.push(opt.name);
        menu.push('</a>');
        menu.push('<ul class="pure-menu-children">');
        menu.push("\n");

        lists.forEach(function (list) {
            list.forEach(function (item) {
                menu.push('<li class="pure-menu-item"><a class="pure-menu-link" href="#');
                menu.push(item);
                menu.push('">');
                menu.push(item);
                menu.push("</a></li>\n");
            })
            menu.push("<hr>\n");
        })

        menu.pop();
        menu.push("</ul></li></ul></div>");

        return menu.join('');
    }
})