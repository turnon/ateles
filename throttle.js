Ateles(_ => {
    return function (interval) {
        let looping = false,
            buffer = [],
            shift = _ => {}

        function _buffer(fn) {
            if (typeof fn !== 'function') return

            if (fn === shift) {
                fn = buffer.shift()
                if (fn) fn()

                setTimeout(_buffer, interval, shift)
                return
            }

            buffer.push(fn)
            if (looping) return

            _buffer(shift)
            looping = true
        }

        return _buffer
    }
})