//通过分页接口使用到的变量
var nowPage = 1;
var pageSize = 10;
var allPage = 1;
var tableData=[];

//事件处理函数
function bindEvent(){
    //点击菜单栏，修改页面
    $('.menu').on('click','dd',function(e){
        var id=$(e.target).data("id");
        $('.menu dd').removeClass("active");
        $(this).addClass("active");
        $('.content-box').fadeOut();
        $('#'+id).fadeIn();
    })

    $('#student-add-btn').click(function(e){
        //form表单要清楚默认的跳转事件
        e.preventDefault();
        var formData=formatFormData($('#student-add-form').serializeArray());
        var data=formData.data;
        if(formData.status=='success'){
            requestData('/api/student/addStudent',data,function(){
                alert("新增学生成功");
                $('.menu dd[data-id="student-list"]').click();
                listData();
            })
        }else{
            alert('信息填写不全');
        }
    })

    //编辑表单
    $('#tbody').on('click','button.edit',function(e){
        var index=$(e.target).parents('tr').index();
        //将要更改的拿一条数据回填到表单中
        renderForm(tableData[index]);
        //弹出编辑框
        $('.modal').slideDown();
    }).on('click','button.delete',function(e){
        var index = $(this).parents('tr').index();
        var isDel=confirm("确认删除吗？");
        if(isDel){
            requestData('/api/student/delBySno',{
                sNo:tableData[index].sNo
            },function(){
                alert("删除成功");
                listData(); 
            })  
        }
    })

    //提交更改后的数据
    $('#student-edit-btn').click(function(e){
        e.preventDefault();
        var formData=formatFormData($('#student-edit-form').serializeArray());
        if(formData.status=='success'){
            requestData('/api/student/updateStudent',formData.data,function(){
                alert("修改成功");
                $('.modal').slideUp();
                listData(); 
            })
        }else{
            alert("信息填写不全");
        }
    })

    $('.modal').on('click',function(e){
        console.log($(e.target)===$(this));
        if(e.target==this){
            $(this).slideUp();
        }
    })

    $('#search-btn').click(function(){
        var val=$('#search-inp').val();
        var sex=$('#search').val();
        if(val){
            requestData('/api/student/searchStudent',{
                search:val,
                sex:sex,
                page:1,
                size:7
            },function(data){
                tableData=data;
                console.log(data);
                renderDom(tableData.searchList);
                $('.menu dd[data-id="student-list"]').click();
            })
        }else{
            getTableData();
        }
    });
}

bindEvent();

//格式化添加学生的表单数据
function formatFormData(data){
    var result={
        status:'success',
        data:{},
        mes:''
    };
    for(var i=0;i<data.length;i++){
        if(data[i].value){
            result.data[data[i].name]=data[i].value;
        }else{
            result.status='fail';
            result.mes='信息填写不全';
        }
    }
    console.log(result);
    return result;
}

function requestData(url,data,cb){
    $.ajax({
        url:'http://open.duyiedu.com'+url,
        type:"get",
        data:$.extend({
            appkey:'77521ily__1571400791988'
        },data),
        dataType:"json",
        success:function(res){
            // console.log(res);
            if(res.status=='success'){
                cb(res.data);
            }else{
                alert(res.msg);
            }
        }
    })
}

//获取添加的数据或者列表中的数据，进行页面渲染
function listData(){
    requestData('/api/student/findByPage',{
        page:1, 
        size:10
    },function(data){
        tableData=data.findByPage;
        //拿到数据渲染页面
        renderDom(tableData);
    })
}

listData();

function renderDom(data){
    var str='';
    data.forEach(function(item,data){
        str+=`<tr>
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
    })
    $('#tbody').html(str);
    
    $('.turn-page').page({
        nowPage:nowPage,
        allPage:allPage,
    })
}

//表单数据回填
function renderForm(data){
    var form=$('#student-edit-form')[0];
    for(var prop in data){
        if(form[prop]){
            form[prop].value=data[prop];
        }
        //表单中的input框
        console.log(form[prop]);
    }
}