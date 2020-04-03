//要在输出之前，即：生成最终的资源文件的时候在他里面添加一个文件
module.exports = class FileListPlugin {

    constructor(filename = "filelist.txt") {
        this.filename = filename;
    }

    apply(compiler) {
        //emit():生成资源到output目录之前
        //当生成文件列表后，就会运行事件处理函数
        compiler.hooks.emit.tap("FileListPlugin", complation => {
            var fileList = [];

            //2.构建文件内容
            for (const key in complation.assets) {
                var content = `【${key}】
大小：${complation.assets[key].size() / 1000}KB`;
                fileList.push(content);
            }
            console.log(fileList);
            //[ '【main.js】\n大小：4.076KB', '【main.js.map】\n大小：3.7KB' ]

            var str = fileList.join("\n\n");
            // console.log(complation.assets["main.js"].source)


            //2.添加资源
            complation.assets[this.filename] = {//添加资源（资源有两个属性：source,size）
                source() {
                    return str
                },
                size() {
                    return str.length;
                }
            }
        })
    }
}