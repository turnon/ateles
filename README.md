# Ateles

Modules for userscript.

## ateles

A module loader like requirejs, can be used to `require` or `define` modules in this repo

```javascript
Ateles(["module_1", "module_2"], (module_1, module_2) => {
    // run userscript with module_1 and module_2
    // or
    // return a new module depends on module_1 and module_2
});
```

## anchor

Usually used with `dropdown` to generate a dropdown table of content

```javascript
anchor({
    selector: _ => document.querySelectorAll(".titletext"), // required, where to add anchors
    text: item => item.innerText, // required, how to extract text
    top: "10px", // optional, in case of nav-bar fixed at top of page
    css: ".content{}" // optional, other css
});
// return {'ateles-anchor-xxx': 'xxx', 'ateles-anchor-yyy', 'yyy' ...}
```

## css

Use `link` to reference css file. By default it adds a `<link>` at beginning of `<head>`, or you provide `{important: true}` to make it add at end of `<head>`

```javascript
css.link("https://unpkg.com/purecss@1.0.0/build/pure-min.css", {
    important: true
});
```

Use `text` to add css code at end of `<head>`

```javascript
css.text(
    ".content{margin-top: 10px;}",
    ".footer{margin-top: 10px}.header{height: 100px}"
);
```

## dropdown

Add dropdown table of content on page. For example, [mongodb_docs_toc](https://github.com/turnon/mongodb_docs_toc)

```javascript
let dd = dropdown(list, {
    beforeend: document.body, // where to add the dropdown list
    direction: "left_down", // what direction to expand the list
    style: {
        // add shadow or not, false as default
        shadow: true,
        // style of the whole list, usually used to set position
        id: "position: fixed; top: 70px; left: 1200px;"
        // other style setting:
        //   hover_link: the hovered arrow
        //   children: the list
    }
});
```

`dropdown` accepts multiple lists. The structure of a `list` can be one of these:

-   `{id_1: 'text_1', id_2: 'text_2', id_3: 'text_3'}`
-   `['text_1', 'text_2', 'text_3']`
-   `[{id: 'id_1', indent: 0, text: 'text_1'}, {id: 'id_2', indent: 2, text: 'text_2'}, {id: 'id_3', indent: 0, text: 'text_3'}]`

## page_loader

Load subsequent pages into current page. Examples:

[when the number of pages is known](https://github.com/turnon/douban_all_photos/blob/master/douban_all_photos.js)

[when unknown](https://github.com/turnon/gocn_all_news/blob/master/gocn_all_news.js)

To lower the frequency:

```javascript
var config = {
    // ...
    interval: function () {
        return 2000;
    }
};
```

To limit the number of pages, for example, 10:

```javascript
var config = {
    // ...
    break_at: function (n) {
        return n >= 10;
    },
};
```