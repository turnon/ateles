Ateles(function () {
    console.log('t4')
    return {
        concat: function () {
            return Array.prototype.slice.call(arguments).join();
        }
    }
})