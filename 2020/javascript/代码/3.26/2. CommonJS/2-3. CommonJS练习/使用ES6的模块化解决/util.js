export default {
    sortRandom(arr) {
        arr.sort(function (a, b) {
            return Math.random() - 0.5
        })
    },
    print(poker) {
        var str = "";
        for (var i = 0; i < poker.length; i++) {
            var p = poker[i];
            str += p.toString() + "  "
        }
        console.log(str)
    }
}