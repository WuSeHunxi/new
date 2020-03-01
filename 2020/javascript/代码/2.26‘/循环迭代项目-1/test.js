var nowPage = 1;
var pageSize = 10;
var allPage = 1;
var tableData = [];

function bindEvent(){
    $('.menu').on('click','dd',function(e){
        var id=$(e.target).data("id");
        $('.menu dd').removeClass('active');
        $(this).addClass('active');
        $('.content-box').fadeOut();
        $("#"+id).fadeIn();
        // console.log("p");
    })

    $('#student-add-btn').click(function(e){
        e.preventDefault();
        var val=$("#student-add-form").serializeArray();
        var formData=formatData(val);
        // console.log(formData);
        if(formData.status=='success'){
            requestData('/api/student/addStudent',formData.data,function(data){
                alert(data.msg);
                $(".menu dd[data-id='student-list']").click();
                getTableData();
            })
        }else{
            alert(formData.mes);
        }
    })

    $('#tbody').on('click','.edit',function(e){
        var index=$(e.target).parents('tr').index();
        var data=tableData[index];
        $('.modal').slideDown();
        renderEditForm(data);
    })


    $('#student-edit-btn').click(function(e){
        e.preventDefault();
        var data=formatData($('#student-edit-form').serializeArray());
        console.log(data);
        var formData=formatData(data);
        if(formData.status=='success'){
            requestData('/api/student/updateStudent',formData.data,function(resData){
                alert(resData.msg);
                $('.modal').slideUp();
                getTableData();
            });
        }else{
            alert(formData.mes);
        }
    })

    $('.modal').on('click',function(e){
        if(e.target==this){
            $('.modal').slideUp();
        }
    })
}

bindEvent();

function formatData(data){
    var result={
        status:'success',
        data:{},
        mes:""
    };
    for(var i=0;i<data.length;i++){
        if(!data[i].value){
            result.mes='信息填写不全';
            result.status='fail';
        }else{
            result.data[data[i].name]=data[i].value;
        }
    }
    return result;
}

function requestData(url,data,cb){
    $.ajax({
        url:'http://open.duyiedu.com'+url,
        type:'get',
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

function getTableData(){
    requestData('/api/student/findByPage',{
        page:nowPage,
        size:pageSize
    },function(dataTable){
        tableData=dataTable.data.findByPage;
        renderDom(tableData);
        // console.log(tableData);
    })
}


getTableData();

function renderDom(data){
    //data是对象，没有办法用数组
    console.log(data);
    var str='';
    data.forEach(function(item,index){
        str+=`
        <tr>
            <td>${item.sNo}</td>
            <td>${item.name}</td>
            <td>${item.sex == 0 ? '男' : '女'}</td>
            <td>${item.email}</td>
            <td>${new Date().getFullYear() - item.birth}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>
                <button class="btn edit">编辑</button>
                <button class="btn delete">删除</button>
            </td>
        </tr>`;      
        // console.log(item);
    })
    // console.log(str);

    $('#tbody').html(str)
}

function renderEditForm(data){
    var form=$('#student-edit-form')[0];
    console.log(data);
    for(var prop in data){
        if(form[prop]){
            form[prop].value=data[prop];
        }
    }
}