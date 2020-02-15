var tableData=[];

function bindEvent(){
    var menuList=document.getElementsByClassName("menu")[0];
    menuList.onclick=function(e){
        if(e.target.tagName!='DD'){
            return false;
        }
        var actives=document.getElementsByClassName('active');
        console.log(actives);
        for(var i=0;i<actives.length;i++){
            actives[i].classList.remove('active');
        }
        e.target.classList.add('active');
        var id=e.target.getAttribute('data-id');
        var contentBox=document.getElementsByClassName('content-box');
        for(var i=0;i<contentBox.length;i++){
            contentBox[i].style.display='none';
        }
        document.getElementById(id).style.display='block';
    }
    var studentAddBtn=document.getElementById("student-add");
    studentAddBtn.onclick=function(e){
        e.preventDefault();
        var form=document.getElementById("student-add-form");
        var data=getFormData(form);
        if(data){
            var res=saveData('http://open.duyiedu.com/api/student/addStudent', Object.assign({
                appkey: '77521ily__1571400791988'
            }, data));
            if(res.status=='fail'){
                alert(res.msg);
            }else{
                alert("增添成功");
                var studentList=menuList.getElementsByTagName('dd')[0];
                studentList.click();
                //渲染添加到列表页面中
                getTableData();
                form.reset();
            }
        }
    }
    var modal=document.getElementsByClassName("modal")[0];
    var tbody=document.getElementById("tbody");
    tbody.onclick=function(e){
        if(e.target.tagName!='BUTTON'){
            return false;
        }
        var edit=e.target.classList.contains('edit');
        var index=e.target.dataset.index;
        if(edit){
            modal.style.display='block';
            renderEditForm(tableData[index]);
        }else{
            var isDel=confirm("确认删除？");
            if(isDel){
                var res = saveData('http://open.duyiedu.com/api/student/delBySno', {
                    appkey: '77521ily__1571400791988',
                    sNo: tableData[index].sNo
                });
                if(res.status=='fail'){
                    alert(res.msg);
                }else{
                    alert("删除成功");
                    getTableData();
                }
            }    
        }
    }
    var studentEditBtn=document.getElementById("student-edit-btn");
    studentEditBtn.onclick=function(e){
        e.preventDefault();
        var form=document.getElementById("student-edit-form");
        var data=getFormData(form);
        if(data){
            var res = saveData('http://open.duyiedu.com/api/student/updateStudent', Object.assign({
                appkey: '77521ily__1571400791988'
            }, data)); 
            if(res.status=='fail'){
                alert(res.msg);
            }else{
                alert("修改成功");
                modal.style.display='none';
                getTableData();
            }
        }
    }
    modal.onclick=function(e){
        modal.style.display='none';
    }
    var modalContent=modal.getElementsByClassName("modal-content")[0];
    modalContent.onclick=function(e){
        e.stopProgation();
    }
}

function getFormData(form){
    var name=form.name.value;
    var sNo=form.sNo.value;
    var sex=form.sex.value;
    var address=form.address.value;
    var phone=form.phone.value;
    var birth=form.birth.value;
    var email=form.email.value;
    if (!name || !sNo || !address || !phone || !birth || !email) {
        alert('信息填写不全，请检查后提交')
        return false;
    }
    if(!(/^\d{4,16}$/.test(sNo))){
        alert("学号应为4-16位数字组成");
        return false;
    }

    if(!(/\w+@\w+\.com$/.test(email))){
        alert("邮箱填写不正确");
        return false;
    }
    if(!(/^\d{4}$/.test(birth))){
        alert("出生年份格式有误");
        return false;
    }

    if(!(/^\d{11}$/.test(phone))){
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
    }
}

function getTableData(){
    var res= saveData("http://open.duyiedu.com/api/student/findAll", {
        appkey: '77521ily__1571400791988'
    });
    // if(res.status=='fail'){
    //     alert("获取数据失败");
    //     return false;
    // }else{
        tableData=res.data;
        //渲染数据到列表页
        renderTable(tableData||[]);
    // }
}

function renderTable(data){
    var str='';
    data.forEach(function(item,index){
        str+=`<tr>
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
        </tr>`;
    })
    document.getElementById("tbody").innerHTML=str;
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