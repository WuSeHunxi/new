// function ajax(options) {
//     const defaultOptions = {
//         method: "get",
//         url: "/"
//     }
//     const opt = {
//         ...defaultOptions,
//         ...options
//     }
//     console.log(opt)
// }

function ajax({
    method = "get",
    url = "/"
} = {}) {
    console.log(method, url)
}

ajax()//当函数没有传参的时候，直接在后面添加默认值即可