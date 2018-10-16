# Ateles

Modules for userscript.

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
