// https://purecss.io/menus/
Ateles(['pure_css', 'style'], function (_, style) {

    var menu_directions = {
        down_right: '',
        up_right: 'bottom: 100%',

        down_left: 'right: 0; left: auto;',
        up_left: 'right: 0; left: auto; bottom: 100%;',

        right_down: 'left: 100%; top: 0;',
        right_up: 'left: 100%; bottom: 0;',

        left_down: 'right: 100%; left: auto; top: 0;',
        left_up: 'right: 100%; left: auto; bottom: 0;'
    };

    var arrow_directions = {
        down_right: ':before{content:"\\25be\\a0"}',
        up_right: ':before{content:"\\25b4\\a0"}',

        down_left: ':after{content:"\\a0\\25be"}',
        up_left: ':after{content:"\\a0\\25b4"}',

        right_down: ':after{content:"\\a0\\25b8"}',
        right_up: ':after{content:"\\a0\\25b8"}',

        left_down: ':before{content:"\\25c2\\a0"}',
        left_up: ':before{content:"\\25c2\\a0"}',
    }

    var i = Date.now();

    function next_id() {
        return i++;
    }

    return function menu() {
        var args = Array.prototype.slice.call(arguments),
            opt = args.pop(),
            lists = args,
            id = next_id(),
            a_id = 'ateles-pure-dropdown-a-' + id,
            menu_id = 'ateles-pure-dropdown-menu-' + id,
            direction = opt.direction || 'down_right';

        style.text('#' + menu_id + '{' + menu_directions[direction] + '}' + '#' + a_id + ':after{content:none}' + '#' + a_id + arrow_directions[direction]);

        var menu = [
            '<div class="pure-menu pure-menu-horizontal">', "\n",
            '<ul class="pure-menu-list">', "\n",
            '<li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">'
        ];

        menu.push('<a href="#" id="');
        menu.push(a_id);
        menu.push('" class="pure-menu-link">');
        menu.push(opt.name);
        menu.push('</a>');
        menu.push('<ul id="');
        menu.push(menu_id);
        menu.push('" class="pure-menu-children">');
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