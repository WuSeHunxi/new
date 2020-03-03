(function(data){
    function renderDom(data){
        var str='';
        $.each(data,function(index,item){
            str+=`
                <li class="clearF">
                <span class="number">${index+1}</span>
                <span class="title">${item.title}</span>
                //{}里面是放ja代码的
                <span class="mes ${item.search>item.hisSearch?"down":"up"}">${item.search}</span>
            </li>`;
             
        })
        $('.showSection').html(str);
    }

    renderDom(data);

    var i=0;
    $('.change').click(function(){
        
        $('.showSection li').hide().eq(i*10).show().nextUntil().show();
        
        i=(i+1)%4;
    
    })
}(data))