function loader(source) {
  return `new source`
}

//filePath表示要对哪个文件进行处理，该方法的作用是通过是否返回来控制下一步到哪（根据loader的运行过程可以看出来），有利于减少后续过程
loader.pitch = function (filePath) {
  // 可返回可不返回
  // 如果返回，返回源代码
}

module.exports = loader;