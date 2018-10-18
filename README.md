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

## page_loader

Load subsequent pages into current page. Examples:

[when the number of pages is known](https://github.com/turnon/douban_all_photos/blob/master/douban_all_photos.js)

[when unknown](https://github.com/turnon/gocn_all_news/blob/master/gocn_all_news.js)
