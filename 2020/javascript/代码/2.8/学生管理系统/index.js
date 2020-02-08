
var tableData = [];
// 绑定事件
function bindEvent() {
    var menuList = document.getElementsByClassName('menu')[0];
    menuList.onclick = function (e) {
        if (e.target.tagName != 'DD') {
            return false;
        }
        var actives = document.getElementsByClassName('active');
        // for (var i = 0; i < actives.length; i++) {
        //     actives[i].classList.remove('active');
        // }
        // e.target.classList.add('active')
        initStyle(actives, 'class', e.target)
        var id = e.target.getAttribute('data-id')
        var contentBox = document.getElementsByClassName('content-box');
        // for (var j = 0; j < contentBox.length; j++) {
        //     contentBox[j].style.display = 'none'
        // }
        // document.getElementById(id).style.display = 'block'
        initStyle(contentBox, 'style', document.getElementById(id));
    }
    var studentAddBtn = document.getElementById('student-add-btn');
    studentAddBtn.onclick = function(e) {
        // 阻止默认行为  提交按钮的默认行为是刷新整个页面
        e.preventDefault()
        var data = getFormData();
        if(data) {
            var res = saveData('http://open.duyiedu.com/api/student/addStudent', Object.assign({
                appkey: 'DuYimeiqi_1564986205860'
            }, data))
            console.log(res)
            if (res.status == 'fail') {
                alert(res.msg)
            } else {
                alert('新增成功');
                //新增成功返回列表页
                var studnetList =menuList.getElementsByTagName('dd')[0];
                studnetList.click()
            }
        }
    }
    var tbody = document.getElementById('tbody');
    tbody.onclick = function (e) {
        //e.target.tarName得到的是大写的
        if (e.target.tagName != 'BUTTON') {
            return false;
        }
        //classList类名列表
        var isEdit = e.target.classList.contains('edit');
        var index = e.target.dataset.index;
        if (isEdit) {
            var modal = document.getElementsByClassName('modal')[0];
            //显示遮罩层
            modal.style.display = 'block';
            renderEditForm(tableData[index])
        } else {
            console.log('删除')
        }

    }
}
// 初始化样式
function initStyle(doms, flag, target) {
    for(var i = 0; i < doms.length; i++) {
        if (flag == 'class') {
            doms[i].classList.remove('active');
        } else {
            doms[i].style.display = 'none'
        }
    }
    if (flag == 'class') {
        target.classList.add('active')
    } else {
        target.style.display = 'block'
    }
}

// 获取表单数据--->在新增数据的页面中的表单
function getFormData() {
    var form = document.getElementById('student-add-form');
    //form.name等获取的是标签
    var name = form.name.value;
    var sNo = form.number.value;
    var sex = form.sex.value;
    var address = form.address.value;
    var phone = form.phone.value;
    var birth = form.birth.value;
    var email = form.email.value;
    if (!name || !number || !address || !phone || !birth || !email) {
        alert('信息填写不全，请检查后提交')
        return false;
    }
    return {
        sNo,
        name,
        sex,
        birth,
        phone,
        address,
        email
        // sNo: sNo
    }
}

// 获取学生列表数据
function getTableData() {
    var res = saveData("http://open.duyiedu.com/api/student/findAll", {
        appkey: 'DuYimeiqi_1564986205860'
    });
    //将请求到的数据放入数组中
    tableData = res.data;
    //请求到数据之后就渲染到页面中
    renderTable(res.data)

}
// 渲染表格数据
function renderTable(data) {
    var str = '';
    data.forEach(function (item, index) {
        str += `<tr>
            <td>${item.sNo}</td>
            <td>${item.name}</td>
            <td>${item.sex}</td>
            <td>${item.email}</td>
            <td>${item.birth}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn edit" data-index="${index}">编辑</button>
                <button class="btn delete" data-index="${index}">删除</button>
            </td>
        </tr>`
    });
    document.getElementById('tbody').innerHTML = str;

}
// 编辑表单的回填
function renderEditForm(data) {
    console.log(data)
    var form = document.getElementById('student-edit-form');
    for (var p in data) {
        if(form[p]) {
            form[p].value = data[p]
        }
    }
}

bindEvent()
getTableData()

// 向后端存储数据
function saveData(url, param) {
    var result = null;
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    if (typeof param == 'string') {
        xhr.open('GET', url + '?' + param, false);
    } else if (typeof param == 'object'){
        var str = "";
        for (var prop in param) {
            str += prop + '=' + param[prop] + '&';
        }
        xhr.open('GET', url + '?' + str, false);
    } else {
        xhr.open('GET', url + '?' + param.toString(), false);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                result = JSON.parse(xhr.responseText);
            }
        }
    }
    xhr.send();
    return result;
}



// var list = saveData("http://open.duyiedu.com/api/student/findAll", {
//     appkey: 'DuYimeiqi_1564986205860'
// });
// console.log(list)