module.exports = class FilePlugin {
    constructor(filename = "filelist.txt") {
        this.filename = filename;
    }
    apply(comliper) {
        comliper.hooks.emit.tap("FileListPlugin", complation => {
            var fileList = [];
            for (const key in complation.assets) {
                var content = `【${key}】
大小：${complation.assets[key].size() / 1000}KB`;
                fileList.push(content);
            }
            console.log(fileList);
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