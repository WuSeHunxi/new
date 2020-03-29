var getMovies = require("./getMovies")
var fs = require("fs");


getMovies().then(movies => {
    //转成json格式的数据
    var json = JSON.stringify(movies);
    fs.writeFile("movie.json", json, function () {
        console.log("成功！")
    });
})