//设置一个装数据的数组
var tableData=[];
function bindEvent(){
    var menuList=document.getElementsByClassName('menu')[0];
    menuList.onclick=function(e){
        if(e.target.tagName!='DD'){
            return false;
        }
        var actives=document.getElementsByClassName('active');
        for(var i=0;i<actives.length;i++){
            actives[i].classList.remove('active');
        }
        e.target.classList.add('active');
        var id=e.target.getAttribute('data-id');
        var contentBox=document.getElementsByClassName('content-box');
        for(var j=0;j<contentBox.length;j++){
            contentBox[j].style.display='none';
        }
        document.getElementById(id).style.display='block';
    }
    //提交表单
    var studentAddBtn=document.getElementById('student-add-btn');
    studentAddBtn.onclick=function(e){
        e.preventDefault();
        var data=getFormData();
        if(data){
            var res=saveData('http://open.duyiedu.com/api/student/addStudent', Object.assign({
                appkey: 'DuYimeiqi_1564986205860'
            }, data));
            if(res.status=='fail'){
                alert(res.msg);
            }else{
                alert('新增成功');
                var studentList=menuList.getElementsByTagName('dd')[0];
                studentList.click();
            }
        }
    }
    var tbody=document.getElementById('tbody');
    tbody.onclick=function(e){
        if(e.target.tagName!='BUTTON'){
            return false;
        }
        var isEdit=e.target.classList.contains('edit');
        var index=e.target.dataset.index;//每一条数据都有一个索引
        if(isEdit){
            var modal=document.getElementsByClassName('modal')[0];
            modal.style.display='block';
            //具体编辑修改的是哪条数据
            renderEditForm(tableData[index]);
        }else{
            console.log('删除');
        }
    }
}

//获取表单数据
function getFormData(){
    var form=document.getElementById('student-add-form');
    //获取表单中添加的内容
    var name=form.name.value;
    var sNo=form.number.value;
    var sex=form.sex.value;
    var address=form.address.value;
    var phone=form.phone.value;
    var birth=form.birth.value;
    var email=form.email.value;
    if(!name||!sNo||!sex||!address||!phone||!birth||!email){
        alert('信息填写不全，请检查后在提交');
        return false;
    }
    return {    
        sNo,name,sex,birth,phone,address,email
    }   
}

//获取要显示在表单中的所有学生的数据
function getTableData(){
    var res=saveData("http://open.duyiedu.com/api/student/findAll", {
        appkey: 'DuYimeiqi_1564986205860'
    });
    tableData=res.data;
    renderTable(res.data);
}

//渲染表格页面
function renderTable(data){
    var str='';
    data.forEach(function(item,index){
        str+=`
        <tr>
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
    </tr>
        `
    })  
}

function renderEditForm(data){
    var form=document.getElementById('student-edit-form');
    for(var p in data){
        if(form[p]){
            form[p].value=data[p];
        }
    }
}

bindEvent();
getTableData();

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

