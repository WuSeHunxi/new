var note = {
  el: null,
  noteList: [],
  minColumnHeight: 0,//最小高度
  minColumnIndex: 0,//最小高度的列
  init: function (options) {
    this.initData(options);
    this.render();
    this.handleMore();
  },
  initData: function (options) {
    var self = this;
    this.el = options.el;
    getData('noteList', function (res) {
      self.noteList = res;
    })
  },
  render () {
    this.el.innerHTML = `
      ${this.renderColumn()}     
    `;
    // <div class="more">查看更多</div>
    this.renderNote(this.noteList);
  },
  renderColumn: function () {
    var template = '';
    for(var i = 0; i < 5; i ++) {
      //创建很多个小红书列
      template += '<div class="note-column"></div>'
    }
    return template;
  },
  renderNote: function (noteList) {
    var noteListLength = this.noteList.length;
    var oColumn = this.el.getElementsByClassName('note-column');

    //取到每一列，循环循环动态在里面生成dom结构
    for(var i = 0; i < noteListLength; i ++) {
      var note = noteList[i];
      var oNoteDiv = document.createElement('div');
      var minIndex = this.getMinColumnInfo().index;
      var oMinColumn = oColumn[minIndex];
      oMinColumn.appendChild(oNoteDiv);
      oNoteDiv.outerHTML = this.noteCmp(note);
    }

  },
  noteCmp: function (note) {
    var cover = note.cover;
    var user = note.user;
    // 每一列的具体内容
    var template = `
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
  getMinColumnInfo: function () {
    var oColumn = document.getElementsByClassName('note-column');
    var columnLength = oColumn.length;
    var minIndex = this.minColumnIndex;
    var minHeight = oColumn[0].offsetHeight;//默认最小高度是第一列

    for(var i = 1; i < columnLength; i ++) {
      var columnHeight = oColumn[i].offsetHeight;
      //寻找最小高度
      if(columnHeight < minHeight) {
        minHeight = columnHeight;
        minIndex = i;
      }
    }

    return {
      height: minHeight,
      index: minIndex
    }
  },
  // handle: function () {
  //   var self = this;
  //   //点击加载更多按钮继续进行加载
  //   this.el.onclick = function (e) {
  //     var dom = e.target;
  //     var isMore = dom.classList.contains('more');
  //     if(isMore) {
  //       self.handleMore();
  //     }
  //   }
  // },
  handleMore: function () {
    var self = this;
    var clientHeight=document.documentElement.clientHeight;
    var scrollTop=document.documentElement.scrollTop;
    var minHeight=this.getMinColumnInfo().height;
    if(clientHeight+scrollTop>minHeight){
      console.log(0)
      console.log(clientHeight,scrollTop,minHeight);
      getData('noteList', function (res) {
          self.renderNote(res);
        })
      // timer=setTimeout(function(){
        
      // },500);
    }
    
  }
}