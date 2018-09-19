// https://purecss.io/menus/
Ateles(['pure_css', 'css'], function (_, css) {

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

    function assign_css(opt) {
        var direction = opt.direction || 'down_right',
            style_opt = opt.style || {},
            id = next_id(),
            selectors = {
                id: 'ateles-pure-menu-' + id,
                link_id: 'ateles-pure-menu-link-' + id,
                children_id: 'ateles-pure-menu-children-' + id
            };

        var style = [
            '#', selectors.id, '{', style_opt.id, '}',

            '#', selectors.link_id, '{text-decoration: none}',
            '#', selectors.link_id, ':after{content:none}',
            '#', selectors.link_id, arrow_directions[direction],
            '#', selectors.link_id, '{', style_opt.link, '}',
            '#', selectors.id, ':hover #', selectors.link_id, '{', style_opt.hover_link, '}',

            '#', selectors.children_id, '{', menu_directions[direction], '}'
        ];

        css.text(style.join(''));

        return selectors;
    }

    return function menu() {
        var args = Array.prototype.slice.call(arguments),
            opt = args.pop(),
            lists = args;

        var selectors = assign_css(opt),
            menu = [
                '<div id="', selectors.id, '" class="pure-menu pure-menu-horizontal">', "\n",
                '<ul class="pure-menu-list">', "\n",
                '<li class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">'
            ];

        menu.push('<a href="#" id="');
        menu.push(selectors.link_id);
        menu.push('" class="pure-menu-link">');
        menu.push(opt.name);
        menu.push('</a>');
        menu.push('<ul id="');
        menu.push(selectors.children_id);
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