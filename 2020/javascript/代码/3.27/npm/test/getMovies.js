const axios = require("axios");
const cheerio = require("cheerio");

async function getMoviesHtml() {
    const resp = await axios.get("https://movie.douban.com/chart");
    return resp.data;
}

// console.log(cheerio)

async function getMoviesData() {
    const html = await getMoviesHtml();
    const $ = cheerio.load(html);
    var trs = $("tr.item");
    var movies = [];
    for (let i = 0; i < trs.length; i++) {
        const tr = trs[i];
        //分析每一个tr
        var m = getMovie($(tr));
        movies.push(m);
    }
    return movies;
}

function getMovie(tr) {
    //需要获取电影的信息
    var name = tr.find("div.pl2 a").text();
    name = name.replace(/\s/g, "");
    name = name.split("/")[0];
    var imgStr = tr.find("a.nbg img").attr("src");
    var detail = tr.find("div.pl2 p.pl").text();
    return {
        name,
        imgStr,
        detail
    }
}

module.exports = getMoviesData;