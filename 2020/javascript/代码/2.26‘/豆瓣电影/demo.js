
var search={
    searchDom:'',
    searchData:[],
    init:function(options){
        searchDom=options.el;
        // this.renderDom();
        this.handle();
    },
    handle(){
        this.handelOnInput()
        this.handleOnFocus()
        this.handleOnburl()
    },
    handelOnInput(){
        var self=this;
        $('.search-input').on('input',function(e){
           var value=$(this).val();
           getData(value,$.proxy(self.getSearchValue,self));
        })
    },
    handleOnFocus(){
        var self=this;
        $('.search-input').on('focus',function(){
            if(self.searchData.length){
                $('.list').show();
            }
        })
    },
    handleOnburl(){
        $('.search-input').on('blur',function(){
            $('.list').hide();
        })
    },
    getSearchValue(res){
        this.searchData=res;
        console.log(this.searchData);
        this.renderDom();
    },
    renderDom(){
        var str='';
        var len=this.searchData.length;
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
    }

}