var search={
    inputDom:null,
    searchListDom:null,
    searchResList:[],
    inputFocus:false,
    prevInputText:'',
    init:function(options){
        this.initData(options.el);
        this.handle();
    },
    initData:function(el){
        this.inputDom=el.getElementsByClassName("search-inp")[0].getElementsByTagName('input')[0];
        this.searchListDom=el.getElementsByClassName("search-list")[0];
    },
    handle:function(){
        this.handleInput();
        this.handleInputBlur();
        this.handleInputFocus();
    },
    handleInput:function(){
        var self=this;
        this.inputDom.oninput=function(e){
            var inputText=e.target.value.tirm();
            //在一个新的函数里面要注意this的指向
            getData(inputText,self.getSearchRes.bind(self));
        }
    },
    handleInputFocus:function(){
        var self=this;
        this.inputDom.onfocus=function(){
            if(self.searchResList.length){
                self.searchListDom.style.display='block';
            }
        }
    },
    handleInputBlur:function(){
        var self=this;
        this.inputDom.onblur=function(){
            self.searchListDom.style.display='none';
        }
    },
    getSearchRes:function(res){
        this.searchResList=res;
        this.render();
    },
    render:function(){
        var searchResList=this.searchResList;
        var length=searchResList.length;
        var template='';
        for(var i=0;i<length;i++){
            var res=searchResList[i];
            template+=`
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
        this.searchListDom.innerHTML=template;
        this.searchListDom.style.display=length==0?'none':'block';
    }
}