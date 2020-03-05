(function(data){

    function bindEvent(){
        $('.citySelect').on('click',function(){
            // console.log('e');
            var provinceStr='';
            // console.log(data);
            data.arr.forEach(function(item,index){
                console.log(item);
                provinceStr+=`<li>${item}</li>`;
            })
            $('.province').html(provinceStr);
            $('.dragDown').slideDown();
        })

        
        $('.province').on('mouseenter','li',function(e){
            var index=$(e.target).index();
            $('.province li').css({
                backgroundColor:"#fff"
            }).eq($(e.target).index()).css({
                backgroundColor:"#ddd"
            })
            var cityStr='';
            cityArr=data.city[index];
            // console.log(cityArr);
            cityArr.forEach(function(item,index){
                cityStr+=`<li>${item[1]}</li>`;
            })
            console.log(cityStr)
            $('ul.city').html(cityStr);
            $('#selectName').html($(this).html());
        })

        $('.province').on('click','li',function(){
            $('#selectName').html($(this).html());
            $('.dragDown').slideUp();
        })

        $('.dragDown').on('mouseleave',function(){
            setTimeout(function(){
                console.log(0);
                $('.dragDown').slideUp();
            },1000);
        })
    }

    bindEvent()

}(obj))