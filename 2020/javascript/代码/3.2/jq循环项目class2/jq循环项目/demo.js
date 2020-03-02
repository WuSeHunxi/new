(function(){

var nowPage = 1;
var pageSize = 10;
var allPage = 1;
var tableData = [];

function bindEvent(){

    $('.btn').on('click','button',function(e){
        // console.log($(e.target));
        if($(e.target).attr('id')=='register'){
            $('.box').fadeOut();
            $('.btn-register').fadeIn();
        }else{
            var data=formatData($("#login-in").serializeArray());
            if(data.status=='success'){
                requestUrl('/api/student/stuLogin','post',data.data,function(res){
                    alert(res.msg);
                    $('.mask').fadeOut();
                })
            }else{
                alert(data.msg);
            }
        }
    })

    $('.rbtn').click(function(e){
        e.preventDefault();
        var reData=formatData($('.f-register').serializeArray());
        if(reData.status=='success'){
            requestUrl('/api/student/stuRegister','post',reData.data,function(res){
                alert(res.msg);
                $('.btn-register').fadeOut();
                $('.box').fadeIn();
                $('.menu dd[data-id="student-list"]').click();
            })
        }else{
            alert(reData.msg);
        }       
    })

    $('.menu').on('click','dd',function(e){
        $('.menu dd').removeClass("active")
            .eq($(e.target).index()-1).addClass("active");    
        var id=$(e.target).data("id");
        $('.content-box').fadeOut();
        $('#'+id).fadeIn();
    })
    
    $('#student-add-btn').click(function(e){
        e.preventDefault();
        var value=$('#student-add-form').serializeArray();
        var formData=formatData(value);
        if(formData.status=='success'){
            //信息填写成功才能添加
            requestUrl('/api/student/addStudent','get',formData.data,function(){
                alert("添加成功");
                listTableData();
            })
        }else{
            alert(formData.msg);
        }
    })

    $('#tbody').on('click','.edit',function(e){
        var index=$(e.target).parents('tr').index();
        // console.log(index);
        listData=tableData[index];
        $('.modal').slideDown();
        renderEditForm(listData);
    }).on('click','.delete',function(e){
        var index=$(e.target).parents("tr").index();
        var data=tableData[index];
        var isDel=confirm("确定删除吗？");
        if(isDel){
            requestUrl("/api/student/delBySno",'get',data,function(resData){
                alert(resData.msg);
                listTableData();
            })
        }
    })

    $('#student-edit-btn').on('click',function(e){
        e.preventDefault();
        var data=formatData($('#student-edit-form').serializeArray());
        // console.log(data);
        if(data.status=='success'){
            requestUrl("/api/student/updateStudent",'get',data.data,function(res){
                alert(res.msg);
                $('.modal').slideUp();
                listTableData();
            })
        }else{
            alert(data.msg);
        }
    })

    $('.modal').on('click',function(e){
        if(this==e.target){
            $('.modal').slideUp();
        }
    })
}

    

bindEvent();

function formatData(dataArr){
    var result={
        status:'success',
        msg:'',
        data:{}
    }
    dataArr.forEach(function(item,index){
        if(item.value){
            result.data[item.name]=item.value;
        }else{
            result.status='fail';
            result.msg='信息填写不全';
        }
        
    })
    console.log(result);
    return result;
}

function requestUrl(url,type,data,cb){
    $.ajax({
        url:'http://open.duyiedu.com'+url,
        type:type,
        data:$.extend({
            appkey:'77521ily__1571400791988'
        },data),
        dataType:'json',
        success:function(res){
            if(res.status=='success'){
                cb(res);
            }else{
                alert(res.msg);
            }
        }
    })
}

//获取所有的数据
function listTableData(){
    requestUrl('/api/student/findByPage','get',{
        page:nowPage,
        size:pageSize
    },function(res){
        tableData=res.data.findByPage;
        renderDom(tableData);
        // console.log(tableData);
    })
}

listTableData();

function renderDom(data){
    var str='';
    data.forEach(function(item,index){    
        str += `<tr>
            <td>${item.sNo}</td>
            <td>${item.name}</td>
            <td>${item.sex == 0 ? '男': '女'}</td>
            <td>${item.email}</td>
            <td>${new Date().getFullYear() - item.birth}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn edit">编辑</button>
                <button class="btn delete">删除</button>
            </td>
        </tr>`;
    })
    $('#tbody').html(str);
}

renderDom(tableData);

function renderEditForm(data){
    var form=$('#student-edit-form')[0];
    for(var prop in data){
        if(form[prop]){
            form[prop].value=data[prop];
        }
    }
}

}())