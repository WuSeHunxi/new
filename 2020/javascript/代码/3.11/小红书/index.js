var wartFull={
    init(){
        this.initData();
        this.renderColumn();
        this.getMinHeight();
        this.handleMore();
    },
    initData(){
        var self=this;
        this.el=document.getElementsByClassName("wrapper")[0];
        this.minIndex=0;
        this.minHeight=0;
        this.columnLength=5;
        this.noteList=[];
        getData('noteList',function(res){
            self.noteList=res;
        })
    },
    renderColumn(){
        for(var i=0;i<this.columnLength;i++){
            var oColumn=document.createElement("div");
            oColumn.className="column";
            this.el.appendChild(oColumn);
        }
        this.renderItem()
    },
    renderItem(){
        var oColumnList=this.el.getElementsByClassName("column");
        for(var i=0;i<this.noteList.length;i++){
            var oItem=document.createElement("div");
            var index=this.getMinHeight().index;
            oItem.className='column-item';
            oColumnList[index].appendChild(oItem);
            oItem.innerHTML=this.renderContent(i);
        }
    },
    getMinHeight(){
        var oColumnList=this.el.getElementsByClassName("column");
        this.minHeight=oColumnList[0].offsetHeight;
        var minHeight=this.minHeight;
        var minIndex=this.minIndex;
        for(var i=0;i<this.columnLength;i++){      
            if(this.minHeight>oColumnList[i].offsetHeight){
                minIndex=i;
                minHeight=oColumnList[i].offsetHeight;
            }
        }
        return {
            height:minHeight,
            index:minIndex
        }
    },
    renderContent(index){
        var noteItem=noteList[index];
        var template=`
            <div class="item-img">
                <img src="${noteItem.cover.url}" alt="">
                ${noteItem.type === 'video' ? '<i class="video"></i>' : ''}
            </div>
            <div class="item-info">
                <p>${noteItem.title}</p>
                <div class="info-pre">
                    <div class="per-user">
                        <img src="${noteItem.user.image}" alt="">
                        ${noteItem.user.officialVerified? '<i class="verified"></i>' : ''}
                        <span>${noteItem.user.nickname}</span>
                    </div>
                    <div class="per-like">
                        <span class="like ${noteItem.isLiked?'heart--red' : ''}"></span>
                        <span class="text">${noteItem.likes}</span>
                    </div>
                </div>
            </div>`; 
        return template;
    },
    handleMore(){
        var self=this;
        window.onscroll=function(){
            var scrollTop=document.documentElement.scrollTop;
            var clientHeight=document.documentElement.clientHeight;
            var minHeight=self.getMinHeight().height;
            if(scrollTop+clientHeight>minHeight){
                setTimeout(function(){
                    getData('noteList', function (res) {
                        self.renderItem(res);
                    })
                })
            }
        }
    }
}

wartFull.init();