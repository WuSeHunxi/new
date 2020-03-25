var express = require("express");
var app = new express();
app.use(express.static("../page"));

app.listen(12306);//端口号尽量大于8000，默认访问80端口