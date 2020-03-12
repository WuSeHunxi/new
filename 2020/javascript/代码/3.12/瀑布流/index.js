var waterFull={
    init(){
        this.initData();
        this.renderColumn();
        this.handleMore()
    },
    initData(){
        var self=this;
        this.warpper=document.getElementsByClassName("wrapper")[0];
        this.columnLength=5;  
        this.noteList=[];
        this.minIndex=0;
        this.minHeight=0;
        getData('noteList',function(res){
            self.noteList=res;
        })
    },
    renderColumn(){
        for(var i=0;i<this.columnLength;i++){
            var column=document.createElement("column");
            column.className='column';
            this.warpper.appendChild(column);
        }
        this.renderContent()
    },
    renderContent(){
        var columnList=this.warpper.getElementsByClassName("column");
        for(var i=0;i<this.noteList.length;i++){
            var content=document.createElement("div");
            content.className='column-item';
            var index=this.getMinHeight().index;
            content.innerHTML=this.renderContentItem(i);
            columnList[index].appendChild(content)
            
        }
    },
    getMinHeight(){
        var columnList=this.warpper.getElementsByClassName("column");
        this.minHeight=columnList[0].offsetHeight;
        var minHeight=this.minHeight;
        var minIndex=this.minIndex;
        for(var i=0;i<columnList.length;i++){
            if(this.minHeight>columnList[i].offsetHeight){
                minIndex=i;
                minHeight=columnList[i].offsetHeight;
            }  
        }
        return {
            height:minHeight,
            index:minIndex
        }
    },
    renderContentItem(index){
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
            if(clientHeight+scrollTop>minHeight){
                setTimeout(function(){
                    getData('noteList', function (res) {
                        self.renderContent(res);
                    })
                },300)
            }
        }
    }
}

waterFull.init();