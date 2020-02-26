var search={
    searchData:[],
    init(option){
        this.render()
        this.handle(option)
    },
    handle:function(option){
        this.handleOnInput(option)
        this.handleFocus();
        this.handleOnblur();
    },
    render:function(){
        var len=this.searchData.length;
        var str='';
        for(var i=0;i<len;i++){
            var res=this.searchData[i];
            
            str+=`
                <li class="search-info">
                <div class="poster">
                    <img 
                    src="${res.img}" 
                    >
                </div>
                <div class="content">
                    <div class="title">
                    <span>${res.title}</span>
                    ${res.year ? `<span class="year">${res.year}</span>` : ''}
                    </div>
                    <div class="sub-title">${res.sub_title}</div>
                    ${res.episode ? `<div class="episode">共${res.episode}集</div>` : ''}
                </div>
                </li>`;    
        }
        $('.list').html(str);
    }, 
    handleFocus:function(){
        var self=this;
        $('.search-input').on('focus',function(){
            if(self.searchData.length){
                $('.list').show();
            }
        })
    },
    handleOnblur:function(){
        $('.search-input').on('blur',function(){
            $('.list').hide();
        })
    },
    handleOnInput:function(option){
        // console.log("p");
        var self=this;
        $('.search-input',option.el).on('input',function(e){
            var $value=$.trim($(e.target).val());
            getData($value,$.proxy(self.getSearchData,self));
            self.render();
        })
    },
    getSearchData(data){
        this.searchData=data;
        console.log(data);
        this.render();
    }
}
