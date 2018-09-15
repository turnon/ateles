Ateles(['test/t2'], function (t2) {
    console.log('t1')
    return {
        minus3: function (n) {
            return n - t2.add(1, 2)
        }
    }
})