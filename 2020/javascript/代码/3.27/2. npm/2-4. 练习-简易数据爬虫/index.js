var getMovies = require("./getMovies")
var fs = require("fs");//fs是特殊的包名，他是nodejs中内置的模块，不会从node_modules中导入，也不会从自己写的模块中导入


getMovies().then(movies => {
    var json = JSON.stringify(movies);
    fs.writeFile("movie.json", json, function () {
        console.log("成功！")
    });
})

//ajax是在浏览器端进行的一种特殊的网络请求