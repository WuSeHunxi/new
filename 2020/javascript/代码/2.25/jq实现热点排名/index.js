(function(data){

    var colorArr=['#f54545','#ff8547','#ffac38'];
    var page=Math.ceil(data.length/10);
    var curIndex=0;
    function bindEvent(){
        $(".change").on('click',function(){

        })
    }

    function renderDom(data){
        var len=(data.length-curIndex*10)>10?10:data.length-curIndex*10;
        curIndex++%page;
        for(var i=0;i<len;i++){
            var $clone=$('.item').clone(true).removeClass("tpl").addClass("show");
            var str='';
            var ele=data[i+curIndex*10];
            str+=` <span class="number">${ele.title}</span>
            <span class="item-content">${ele.search}</span>
            <span class="rate">${ele.hisSearch}</span>`;
            $clone.html(str);
        }
        $clone.appendTo($(".list"));
        
    }
    renderDom(data);


}(data))