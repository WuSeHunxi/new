module.exports = class FilePlugin {
    constructor(filename = "filename.txt") {
        this.filename = filename;
    }

    apply(complier) {
        complier.hooks.emit.tap("FilePlugin", complation => {
            var fileList = [];
            for (const key in complation.assets) {
                var content = `【${key}】
大小：${complation.assets[key].size() / 1000}KB`;
                fileList.push(content);
            }
            var str = fileList.join("\n\n");
            complation.assets[this.filename] = {
                source() {
                    return str;
                },
                size() {
                    return str.length;
                }
            }
        })
    }
}