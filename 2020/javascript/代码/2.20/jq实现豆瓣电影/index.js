var search={
    $searchInput:'',
    $searchDom:'',
    searchData:[],
    init:function(dom){
        this.initData(dom);
        this.handle();
    },
    initData:function(dom){
        this.$searchInput=dom.find('.search-inp');
        // console.log(this.$searchInput);
        this.$searchDom=dom.find('.menu');
    },
    handle(){
        this.handleInput();
        this.handleFocus();
        this.handleBlur();
        // console.log(this.$searchInput);
    },
    handleInput(){
        var self=this;
        this.$searchInput.on('input',function(e){
            var searchValue=$(e.target).val();
            // console.log(searchValue);
            getData(searchValue,$.proxy(self.getSearch,self));
        })
    },
    handleFocus(){
        var self=this;
        this.$searchInput.on('focus',function(){
            self.$searchDom.css({display:'block'});
        })
    },
    handleBlur(){
        var self=this;
        this.$searchInput.on('blur',function(){
            self.$searchDom.css({display:'none'});
        })
    },
    getSearch(res){
        this.searchData=res;
        this.render();
    },
    render(){
        var list=this.searchData;
        var str='';
        var length=this.searchData.length;
        for(var i=0;i<length;i++){
            var res=list[i];
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
            </li>
            `;
        }
        this.$searchDom.html(str);
        this.$searchDom.css({display:length==0?'none':'block'})
        // console.log(this.$searchDom);
    }
}

