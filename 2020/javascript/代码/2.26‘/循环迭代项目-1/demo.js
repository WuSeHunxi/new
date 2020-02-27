
function bindEvent(){

    //菜单栏点击
    $('.menu').on('click','dd',function(e){
        $('.menu dd').removeClass('active');
        $(this).addClass('active');
        var id=$(this).data('id');
        $('.content-box').fadeOut();
        $('#'+id).fadeIn();
    })

    //表单提交
    $('#student-add-btn').click(function(){
        var formData=getFormData($('#student-add-form'.serializeArray()))
        if(formData.status=='success'){
            alert("新增成功");
            $('.menu dd[data-id=student-list]').click();
        }
    })

    //编辑，删除
    $('#tbody').on('click','.edit',function(){

    }).on('click','.delete',function(){

    })

    //编辑提交
    $('#student-edit-btn').click(function(e){

    })

    //蒙版效果
    $('.modal').click(function(e){

    })
}


bindEvent();


function getFormData(dataArr){
    var result={
        status:'success',
        data:{},
        mes:''   
    };
    for(var i=0;i<dataArr.length;i++){
        if(!dataArr[i].value){
            result.status='fail'
            result.mes='信息填写不全';
        }
        result.data[dataArr[i].name]=dataArr[i].value;
    }
    return result;
}

function  renderList(data){
    var str='';
    data.forEach(function(item,index){
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
}

renderList(data);