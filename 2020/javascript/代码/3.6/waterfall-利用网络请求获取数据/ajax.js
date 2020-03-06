
/**
 * ajax  async JavaScript  and XML
 *      主要用途就是获取后台数据 与后台进行数据交互
 *      XMLHttpRequest--原生js
 *          
 *      url: 请求的地址
 *      type: 请求方式  :  get  post
 *      data: 请求参数 字符串 key=value&key1=value1
 *      callback: 成功的回调函数（接收到后端的响应的时候执行的函数）
 *      flag:  是否异步
 *          XMLHTTPRequest()
 */
function ajax(type, url, data, callback, flag) {
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    if (type == 'GET') {
        //get请求将url盒数据拼接在一起进行请求
        xhr.open(type, url + '?' + data, flag);
        xhr.send();
    } else if (type == 'POST') {
        xhr.open(type, url, flag);
        // application/json   json 字符串或json对象
        // multipart/form-data  上传文件 file  
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    // 1 - 4
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText)
            } else {
                throw Error('请求错误')
            }
        }
    }
}