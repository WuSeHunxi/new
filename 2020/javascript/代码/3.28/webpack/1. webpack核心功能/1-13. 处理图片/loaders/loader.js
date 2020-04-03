function loader(buffer) {
    var content = getBase64(buffer);
    return `module.exports=\`${content}\``;
}
module.exports = loader;

loader.raw = true;

function getBase64(buffer) {
    return "data:image/png;base64," + buffer.toString("base64");
}