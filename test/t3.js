return Ateles(['test/t2'], function (t2) {
    return {
        plus3: function (n) {
            return n + t2.add(1, 2)
        }
    }
})