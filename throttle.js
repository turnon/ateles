Ateles(_ => {
    return function (interval) {
        let looping,
            buffer = []

        function loop() {
            let fn = buffer.shift()
            if (!fn) return looping = undefined

            fn()
            looping = setTimeout(loop, interval)
        }

        return function (fn) {
            if (typeof fn !== 'function') return
            buffer.push(fn)
            looping || loop()
        }
    }
})