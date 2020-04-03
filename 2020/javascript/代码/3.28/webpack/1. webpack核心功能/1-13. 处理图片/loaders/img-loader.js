var loaderUtil = require("loader-utils")//工具包


//二进制文件无法正常操作，因此要将其转成base64格式的文件
function loader(buffer) { //给的是buffer
    console.log("文件数据大小：(字节)", buffer.byteLength);
    //contenthash-->根据具体的某一个文件生成的hash
    var { limit = 1000, filename = "[contenthash].[ext]" } = loaderUtil.getOptions(this);
    if (buffer.byteLength >= limit) {
        var content = getFilePath.call(this, buffer, filename);
    }
    else {
        var content = getBase64(buffer)
    }
    return `module.exports = \`${content}\``;
}

loader.raw = true; //该loader要处理的是原始数据，这个属性会将传入的参数不再是字符串，而是二进制格式

module.exports = loader;

// 将二进制变成base64格式
function getBase64(buffer) {
    //base64的图片格式
    return "data:image/png;base64," + buffer.toString("base64");
}

function getFilePath(buffer, name) {
    var filename = loaderUtil.interpolateName(this, name, {
        content: buffer
    });
    this.emitFile(filename, buffer);//该文件直接会在最终资源文件中加入进去
    return filename;
}