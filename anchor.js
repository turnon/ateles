Ateles('css', css => {
    let anchor_posistion = 'beforebegin',
        klass_prefix = 'ateles-anchors-',
        id_prefix = 'ateles-anchor-',
        seq = 0,
        next_seq = () => seq++,
        style = (cfg) => {
            let s = cfg.top ? ['height: ', cfg.top, ';margin-top: -', cfg.top, ';'] : []
            s.push(cfg.css)
            return s.join('')
        }

    return cfg => {
        let items = cfg.selector(),
            texts = {},
            klass = klass_prefix + next_seq()

        css.text('.', klass, '{', style(cfg), '}')

        for (let i = 0; i < items.length; i++) {
            let item = items[i],
                text = cfg.text(items[i]),
                id = id_prefix + text,
                anchor = ['<div id="', id, '" class="', klass, '"></div>'].join('')

            texts[id] = text
            item.insertAdjacentHTML(anchor_posistion, anchor)
        }

        return texts
    }
})