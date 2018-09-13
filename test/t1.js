return Ateles(['test/t2'], function (t2) {
    return {
        minus3: function (n) {
            n - t2.add(1, 2)
        }
    }
})