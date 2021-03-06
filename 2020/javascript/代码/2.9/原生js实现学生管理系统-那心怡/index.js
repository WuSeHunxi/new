
var tableData = [];
// 分页功能需要的参数
var nowPage = 1;
var pageSize = 5;
var allPage = 1;

// 绑定事件
function bindEvent() {
    var menuList = document.getElementsByClassName('menu')[0];
    //左侧导航
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
        //查询信息
        initStyle(contentBox,'style',document.getElementById(id));
    }
    //表单提交
    var studentAddBtn = document.getElementById('student-add-btn');
    studentAddBtn.onclick = function(e) {
        // 阻止默认行为  提交按钮的默认行为是刷新整个页面
        e.preventDefault()
        var form = document.getElementById('student-add-form');
        var data = getFormData(form);
        if(data) {
            // var res = saveData('http://open.duyiedu.com/api/student/addStudent', Object.assign({
            //     appkey: '77521ily__1571400791988'
            // }, data))
            // if (res.status == 'fail') {
            //     alert(res.msg)
            // } else {
            //     alert('新增成功')
            //     var studnetList = menuList.getElementsByTagName('dd')[0];
            //     studnetList.click()
            //     getTableData();
            // }

            transferData('/api/student/addStudent', data, function () {
                alert('新增成功')
                var studnetList = menuList.getElementsByTagName('dd')[0];
                studnetList.click()
                getTableData();
                form.reset();
            })
        }
    }
    var btnSearch=document.getElementsByClassName('btn-search')[0];
    var contentSearch=document.getElementsByClassName("num-search")[0];
    var sexSelect=document.getElementById("sex-search");
    var sizeSearch=document.getElementsByClassName("size-search")[0];
    var pageSearch=document.getElementsByClassName("page-search")[0];
    btnSearch.onclick=function(){
        var contentData=contentSearch.value;
        var page=parseInt(sizeSearch.value);
        var size=parseInt(pageSearch.value);
        console.log(typeof(size))
        console.log(contentData,page,size);
        var sex=parseInt(sexSelect.value);
        console.log(sex);
        transferData('/api/student/searchStudent', {
            sex:sex,
            search:contentData,
            page: page,
            size: size,
        }, function (data) {
            console.log(data);
            tableData=data.searchList;
            renderTable(tableData||[]);
            var studnetList = menuList.getElementsByTagName('dd')[0];
            studnetList.click()
        }) 
    }
    var tbody = document.getElementById('tbody');
    var modal = document.getElementsByClassName('modal')[0];
    //编辑或者删除
    tbody.onclick = function (e) {
        if (e.target.tagName != 'BUTTON') {
            return false;
        }
        var isEdit = e.target.classList.contains('edit');
        var index = e.target.dataset.index;
        if (isEdit) {
            modal.style.display = 'block';
            renderEditForm(tableData[index])
        } else {
            var isDel = confirm('确认删除？');
            if (isDel) {
                // var res = saveData('http://open.duyiedu.com/api/student/delBySno', {
                //     appkey: '77521ily__1571400791988',
                //     sNo: tableData[index].sNo
                // });
                // if (res.status == 'fail') {
                //     alert(res.msg);
                // } else {
                //     alert('删除成功');
                //     getTableData();
                // }
                transferData('/api/student/delBySno', {
                    sNo: tableData[index].sNo
                }, function () {
                    alert('删除成功');
                    getTableData();
                })
            }
        }

    }
    var studentEditBtn = document.getElementById('student-edit-btn')
    studentEditBtn.onclick = function (e) {
        e.preventDefault();
        var form = document.getElementById('student-edit-form');
        var data = getFormData(form);
        if(data) {
            // var res = saveData('http://open.duyiedu.com/api/student/updateStudent', Object.assign({
            //     appkey: '77521ily__1571400791988'
            // }, data));
            // if (res.status == 'fail') {
            //     alert(res.msg);
            // } else {
            //     alert('修改成功');
            //     modal.style.display = 'none';
            //     getTableData();
            // }
            transferData('/api/student/updateStudent', data, function () {
                alert('修改成功');
                modal.style.display = 'none';
                getTableData();
            })
        }
    }
    var nextBtn = document.getElementById('next-btn');
    var prevBtn = document.getElementById('prev-btn');
    //上一页
    prevBtn.onclick = function (e) {
        nowPage --;
        getTableData();
    }
    //下一页
    nextBtn.onclick = function () {
        nowPage ++;
        getTableData();
    }
    //点击蒙层,弹框蒙层全部消失
    modal.onclick = function (e) {
        modal.style.display = 'none'
    }
    var modalContent = modal.getElementsByClassName('modal-content')[0];
    // 蒙层点击时,取消父级冒泡功能
    modalContent.onclick = function (e) {
        e.stopPropagation()
        // e.cancelBubble = true;
        // return false;
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

// 获取表单数据,提交的时候需要获取数据,然后判断数据是否提交成功
function getFormData(form) {
    var name = form.name.value;
    var sNo = form.sNo.value;
    var sex = form.sex.value;
    var address = form.address.value;
    var phone = form.phone.value;
    var birth = form.birth.value;
    var email = form.email.value;
    if (!name || !number || !address || !phone || !birth || !email) {
        alert('信息填写不全，请检查后提交')
        return false;
    }
    //正则表达式规范输入的内容
    if (!(/^\d{4,16}$/.test(sNo))) {
        alert('学号应为4-16伪数字组成');
        return false;
    }
    if (!(/\w+@\w+\.com$/.test(email))) {
        alert('邮箱格式不正确');
        return false;
    }
    if (!(/^\d{4}$/.test(birth))) {
        alert('出生年份格式有误');
        return false;
    }
    if (!(/^\d{11}$/.test(phone))) {
        alert("手机号格式错误");
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
    // var res = saveData("http://open.duyiedu.com/api/student/findAll", {
    //     appkey: '77521ily__1571400791988'
    // });
    //获取每一页学生的数据
    transferData('/api/student/findByPage', {
        page: nowPage,
        size: pageSize
    }, function (data) {       
        // 35   10  4
        // 得到具体多少页
        allPage = Math.ceil(data.cont / pageSize);
        tableData = data.findByPage;
        renderTable(tableData || [])  
    })
   
}
// 渲染表格数据
function renderTable(data) {
    var str = '';
    data.forEach(function (item, index) {
        str += `<tr>
            <td>${item.sNo}</td>
            <td>${item.name}</td>
            <td>${item.sex == 0 ? '男': '女'}</td>
            <td>${item.email}</td>
            <td>${new Date().getFullYear() - item.birth}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn edit" data-index="${index}">编辑</button>
                <button class="btn delete" data-index="${index}">删除</button>
            </td>
        </tr>`
    });
    document.getElementById('tbody').innerHTML = str;
    var nextBtn = document.getElementById('next-btn');
    var prevBtn = document.getElementById('prev-btn');
    if (nowPage < allPage) {
        nextBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'none';
    }
    if (nowPage > 1) {
        prevBtn.style.display = 'inline-block';
    } else {
        prevBtn.style.display = 'none';
    }

}
// 编辑表单的回填
function renderEditForm(data) {
    var form = document.getElementById('student-edit-form');
    for (var p in data) {
        if(form[p]) {
            form[p].value = data[p]
        }
    }
}
// 降低请求部分代码的冗余
function transferData(url, data, cb) {
    var res = saveData('http://open.duyiedu.com' + url, Object.assign({
        appkey: '77521ily__1571400791988',
    }, data));
    if (res.status == 'fail') {
        alert(res.msg);
    } else {
        cb(res.data)
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