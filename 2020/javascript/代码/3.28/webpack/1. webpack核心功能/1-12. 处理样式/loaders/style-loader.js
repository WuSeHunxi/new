module.exports = function (sourceCode) {
    //在打包的过程中运行的时候是没有页面的，因此直接使用dom操作时不好使的
    //打包到最终的js中，通过html引入js来执行
    var code = `var style = document.createElement("style");
    style.innerHTML = \`${sourceCode}\`;
    document.head.appendChild(style);
    module.exports = \`${sourceCode}\``;
    return code;
}