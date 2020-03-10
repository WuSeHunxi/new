var note={
    el:null,
    noteList:[],
    minColumnHeight:0,
    minColumnIndex:0,
    init:function(options){
        this.el=options.el;
        this.initData();
        this.render();
        this.loadMore();
    },
    initData(){
        var self=this;
        getData('noteList',function(res){
            self.noteList=res;
        })
    },
    render(){
        this.renderColumn();
        this.renderNote(this.noteList);
    },
    renderColumn(){
        for(var i=0;i<5;i++){
            var oDiv=document.createElement("div");
            oDiv.className='note-column';
            this.el.appendChild(oDiv);
        }
    },
    renderNote(data){
        var noteLength=data.length;
        var oColumn=this.el.getElementsByClassName("note-column");
        // console.log(oColumn);
        // console.log(noteLength);
        for(var i=0;i<noteLength;i++){
            var item=data[i];
            // console.log(item)
            var oNoteDiv=document.createElement("div");
            var minIndex=this.getMinHeight().index;
            oColumn[minIndex].appendChild(oNoteDiv);
            oNoteDiv.innerHTML=this.noteCmp(item);
        }
    },
    getMinHeight(){
        var oColumn=document.getElementsByClassName("note-column");
        var columnLength=oColumn.length;
        var minIndex=this.minColumnIndex;
        var minHeight=oColumn[0].offsetHeight;
        for(var i=0;i<columnLength;i++){
            var columnHeight=oColumn[i].offsetHeight;
            if(minHeight>columnHeight){
                minIndex=i;
                minHeight=columnHeight;
            }
        }
        return {
            index:minIndex,
            height:minHeight
        }
    },
    noteCmp(note){
        var cover=note.cover;
        var user=note.user;
        var template=`
        <div class="note">
          <div class="note-info">
            <div class="note-img">
              <img src="${cover.url}" />
              ${note.type === 'video' ? '<i class="video"></i>' : ''}
            </div>
            <h3 class="info">${note.title}</h3>
          </div>
          <div class="note-append">
            <div class="user">
              <div class="avatar">
                <img src="${user.image}">
                ${user.officialVerified ? '<i class="verified"></i>' : ''}
              </div>
              <div class="name">${user.nickname}</div>
            </div>
            <div class="like">
              <i class="heart ${note.isLiked ? 'heart--red' : ''}"></i>
              <span class="likes">${note.likes}</span>
            </div>
          </div>
        </div>
      `;
      return template;
    },
    loadMore(){
        var self=this;
        var scrollTop=document.documentElement.scrollTop;
        var clientHeight=document.documentElement.clientHeight;
        var minHeight=this.getMinHeight().height;
        console.log(0)
        console.log(scrollTop);
        if(scrollTop+clientHeight>minHeight){
            console.log('p')
            getData('noteList',function(res){
                self.renderNote(res);
            })
        }
    }
}