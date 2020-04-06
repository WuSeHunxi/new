import a from "./a";
import "./index.css"
console.log(a);

//使用热更新：页面不会全部刷新
if (module.hot) {//该段代码最终会参与运行
  // 是否开启了热更新
  module.hot.accept(); // 接受热更新
}
//更新的内容是服务器告诉浏览器客户端的