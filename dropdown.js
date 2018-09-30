// https://purecss.io/menus/
Ateles(['pure_css', 'css'], function (_, css) {

    var menu_directions = {
        down_right: 'top: 100%; margin: 0 0 0 -1px;',
        up_right: 'bottom: 100%; margin: 0 0 0 -1px;',

        down_left: 'top: 100%; right: 0; left: auto; margin: 0 -1px 0 0;',
        up_left: 'right: 0; left: auto; bottom: 100%; margin: 0 -1px 0 0;',

        right_down: 'left: 100%; top: 0; margin: -1px 0 0 0;',
        right_up: 'left: 100%; bottom: 0; margin: 0 0 -1px 0;',

        left_down: 'right: 100%; left: auto; top: 0; margin: -1px 0 0 0;',
        left_up: 'right: 100%; left: auto; bottom: 0; margin: 0 0 -1px 0;'
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
    };

    var positions = ['beforebegin', 'afterbegin', 'beforeend', 'afterend'];

    var i = Date.now();

    function next_id() {
        return i++;
    }

    var custom_pure_style = [
        '.ateles-pure-menu-hr{display: block; border: 0; border-top: 1px solid #f4f4f4; margin: 0; padding: 0;}',
        '.ateles-pure-menu-children{border: 1px solid #eee;}',
        '.ateles-pure-menu-link{padding: 0 .5em; float: none; text-decoration: none; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;}'
    ];

    function assign_css(opt) {
        var direction = opt.direction || 'down_right',
            arrow = arrow_directions[direction],
            style_opt = opt.style || {},
            id = next_id(),
            selectors = {
                id: 'ateles-pure-menu-' + id,
                link_id: 'ateles-pure-menu-link-' + id,
                has_children_id: 'ateles-pure-menu-has-children-' + id,
                children_id: 'ateles-pure-menu-children-' + id
            };

        arrow = opt.name ? arrow : arrow.replace(/\\a0/, '');

        var force_custom = custom_pure_style.map(s => ['#', selectors.id, ' ', s]).flat(),
            style = force_custom.concat([
                '#', selectors.id, '{', style_opt.id, '}',

                '#', selectors.link_id, '{text-decoration: none}',
                '#', selectors.link_id, ':after{content:none}',
                '#', selectors.link_id, arrow,
                '#', selectors.link_id, '{', style_opt.link, '}',
                '#', selectors.id, ':hover #', selectors.link_id, '{', style_opt.hover_link, '}',

                '#', selectors.children_id, '{', menu_directions[direction], style_opt.children, '}'
            ]);

        if (arrow.indexOf('after') > -1) {
            style = style.concat(['#', selectors.link_id, ':after{padding-left: 0}']);
        }

        if (style_opt.shadow) {
            style = style.concat([
                '#', selectors.has_children_id, '{border: none}',
                '#', selectors.children_id, '{box-shadow: 3px 3px 1px rgba(0,0,0,0.2);}'
            ]);
        } else {
            style = style.concat(['#', selectors.has_children_id, '{border: 1px solid #eee;}']);
        }

        css.text.apply(null, style);

        return selectors;
    }

    function insert(menu, opt) {
        var position = positions.find(function (p) {
            return opt[p];
        });
        opt[position].insertAdjacentHTML(position, menu);
    }

    function add_li(menu, list) {
        var is_arr = Array.isArray(list);
        for (var k in list) {
            var text = list[k],
                href = is_arr ? text : k;

            menu.push('<li class="pure-menu-item"><a class="pure-menu-link ateles-pure-menu-link" href="#');
            menu.push(href);
            menu.push('">');
            menu.push(text);
            menu.push("</a></li>\n");
        }
    }

    return function dropdown() {
        var args = Array.prototype.slice.call(arguments),
            opt = args.pop(),
            lists = args;

        var selectors = assign_css(opt),
            menu = [
                '<div id="', selectors.id, '" class="pure-menu pure-menu-horizontal">', "\n",
                '<ul class="pure-menu-list">', "\n",
                '<li id="', selectors.has_children_id,
                '" class="pure-menu-item pure-menu-has-children ateles-pure-menu-has-children pure-menu-allow-hover">'
            ];

        menu.push('<a href="#" id="');
        menu.push(selectors.link_id);
        menu.push('" class="pure-menu-link ateles-pure-menu-link">');
        menu.push(opt.name);
        menu.push('</a>');
        menu.push('<ul id="');
        menu.push(selectors.children_id);
        menu.push('" class="pure-menu-children ateles-pure-menu-children">');
        menu.push("\n");

        lists.forEach(function (list) {
            add_li(menu, list);
            menu.push("<hr class='ateles-pure-menu-hr'>\n");
        })

        menu.pop();
        menu.push("</ul></li></ul></div>");

        insert(menu.join(''), opt);
    }
})