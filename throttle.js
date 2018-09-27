Ateles(_ => {
    return function (interval) {
        let looping,
            prev = Date.now(),
            buffer = [],
            shift = _ => {}

        function _buffer(fn) {
            if (typeof fn !== 'function') return

            if (fn === shift) {
                if (fn = buffer.shift()) {
                    fn()
                    prev = Date.now()
                }

                looping = setTimeout(_buffer, interval, shift)
                return
            }

            if (Date.now() - prev > interval) {
                clearTimeout(looping)
                looping = undefined
            }

            buffer.push(fn)
            if (looping) return

            _buffer(shift)
        }

        return _buffer
    }
})