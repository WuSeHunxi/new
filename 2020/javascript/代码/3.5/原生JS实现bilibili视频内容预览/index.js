var video = {
  videoList: [],
  videoWidth: 206,
  videoHeight: 116,
  backgroundSize: 2060,
  lineWidth: 196,
  init: function (options) {
    this.initData(options);
    this.render();
    this.handle();
  },
  initData: function (options) {
    this.el = options.el;
    this.videoList = this.addRatio(options.videoList);
  },
  addRatio: function (videoList) {
    var videoLength = videoList.length; 
    var backgroundSize = this.backgroundSize;

    for(var i = 0; i < videoLength; i ++) {
      var pvideo = videoList[i].pvideo;
      // 添加ratio（图片放大比例）
      //             backgroundSize
      //  ---------------------------------------
      //    pvideo.img_x_len * pvideo.img_x_size
      pvideo.ratio = backgroundSize / pvideo.img_x_len / pvideo.img_x_size;
    }
    return videoList;
  },
  render: function () {
    // 渲染元素 
    var oUl = document.createElement('ul');
    var template = '';
    var length = this.videoList.length;

    for(var i = 0; i < length; i ++) {
      var video = this.videoList[i];
      template += `
        <li class="video">
          <div class="poster">
            <img src="${video.poster}" alt="${video.title}" class="poster">
            <div class="video-info">
              <div class="play">${video.play > 10000 ? Math.floor(video.play / 10000) + '万' : video.play}</div>
              <div class="likes">${video.likes > 10000 ? Math.floor(video.likes / 10000) + '万' : video.likes}</div>
            </div>
            <div class="mask" index="${i}">
              <div class="line">
                <div class="bottom"></div>
                <div class="top"></div>
              </div>
            </div>
          </div>
          <div class="title">${ video.title }</div>
          <div class="up">up ${ video.up }</div>
        </li>
      `;
    };
    oUl.innerHTML = template;
    oUl.setAttribute('class', 'video-list');
    this.el.innerHTML = oUl.outerHTML;
  },
  handle: function () {
    // 监听元素鼠标移动事件
    var self = this;
    this.el.onmousemove = function (e) {
      var dom = e.target;
      var isMask = dom.classList.contains('mask');
      if(isMask) {
        self.handleMaskMove(dom, e.offsetX);
      }
    }
  },
  handleMaskMove: function (oMask, x) {
    // 设置线宽度的改变
    this.setLineWidth(oMask, x);
    // 设置mask元素背景图片的改变
    this.setMaskBG(oMask, x);
  },
  setLineWidth (oMask, x) {
    // 获取“线”元素
    var oTopLine = oMask.getElementsByClassName('top')[0];
    // 设置“线”元素的宽度
    //         x                  y                    x * this.lineWidth   
    // ----------------- = -----------------  => y = ----------------------
    //  this.videoWidth      this.lineWidth              this.videoWidth
    oTopLine.style.width = x * this.lineWidth / this.videoWidth + 'px'; 
    
  },
  setMaskBG (oMask, x) {
    var index = oMask.getAttribute('index');  // 获取到当前mask元素的索引 index 
    var pvideo = this.videoList[index].pvideo;  // 根据索引找到对应pvideo信息
    var bgLen = pvideo.index.length;  // 获取整体背景图片的个数
    var xLen = pvideo.img_x_len;  // 获取背景图片每一行小背景图片的个数
    var ratio = pvideo.ratio; // 获取到图片伸缩比例值
    var picWidth = this.videoWidth / bgLen;  // 求得每隔多少宽度更换一张背景
    var position = Math.floor(x / picWidth); // 求得当前应该显示第几张图片

    var bgIndex = Math.floor(position / 100); // 求得当前应该显示第几张图片（每张图片上有100张）
    oMask.style.backgroundImage = 'url(' + pvideo.image[bgIndex] + ')'; // 设置mask元素的背景图片

    position = position - bgIndex * 100;  // 求得当前应该显示对应图片第几个小图
    
    var row = Math.floor( position / xLen ); // 求得小图所在 行
    var col = position - row * xLen;  // 求得小图所在 列

    var positionX = -col * 160 * ratio + 'px';  // 图片背景水平位置
    var positionY = -row * 90 * ratio + 'px'; // 图片背景垂直位置

    // 设置背景位置
    oMask.style.backgroundPositionX = positionX; 
    oMask.style.backgroundPositionY = positionY;
  }
}