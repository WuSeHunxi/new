/**
 * 
 * 先想清楚需要用什么方式完成：对象
 * 对象需要什么属性
 * 对象需要哪些方法
 * 一个功能就是一个方法，要实现函数的单一功能
 * 
 */

var hitMouse = {
  el: null, // 父元素
  score: 0, // 分数
  oHoles: null, // 放置 “洞” 的 元素
  oHoleList: [], // “洞” 元素列表
  holeLength: 0, // “洞” 元素个数
  randomArr: [], // 随机数数组 [0, 1, 2, 3, 4...]
  timer: 0, // 定时器
  speed: 1000, // 每个地鼠出现的时间间隔
  init: function (options) {
    /**
     * 初始化函数
     */
    var self = this;
    this.initData(options);
    this.renderScore();
    this.handle();
    //根据定时器生成地鼠
    this.timer = setInterval(function () {
      self.showMouse();
    }, this.speed)
  },
  initData: function (options) {
    /**
     * 初始化数据
     */
    this.el = options.el;
    this.oHoles = this.el.getElementsByClassName('holes')[0];
    this.oHoleList = this.el.getElementsByClassName('hole');
    this.holeLength = this.oHoleList.length;
    this.randomArr = this.getRandomArr(this.holeLength);
  },
  getRandomArr(num) {
    /**
     * 获取随机数数组
     */
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push(i);
    }
    return arr;
  },
  renderScore: function () {
    /**
     * 渲染分数
     */
    var oScore = this.el.getElementsByClassName('score')[0];
    oScore.innerText = this.score;
  },
  showMouse: function () {
    /**
     * 出现地鼠
     */
    var randomNum = this.getRandomNum();
    var oHoleList = this.oHoleList;
    var oMouse = document.createElement('div');
    oMouse.setAttribute('class', 'mouse');
    oMouse.num = randomNum;
    oHoleList[randomNum].appendChild(oMouse);

    if (this.checkFail()) {
      this.failGame();
    }
  },
  getRandomNum: function () {
    /**
     * 获取随机数
     */
    var randomArrLength = this.randomArr.length;
    var randomNum = Math.floor(Math.random() * randomArrLength);
    //splice(start,num)-->start：拿到的是哪一个，num：从start开始有几个---》表示删除的意思
    //避免一个坑出现好几个地鼠
    var num = this.randomArr.splice(randomNum, 1);
    return num;
  },
  checkFail: function () {
    /**
     * 检查是否失败
     */
    if (this.randomArr.length) {//如果地鼠满了就失败
      return false;
    } else {
      return true;
    }
  },
  failGame: function () {
    /**
     * 游戏失败需要做的处理
     */
    var self = this;
    clearInterval(this.timer);

    setTimeout(function () {//该定时器为了让最后一个地鼠成功显示才添加的
      alert('失败');
      self.score = 0;
      self.renderScore();//分数变成0，重新渲染
      self.clearMouse();//清除地鼠
    }, 300)
  },
  clearMouse: function () {
    /**
     * 清除所有鼠
     */
    var oMouseList = this.el.getElementsByClassName('mouse');
    var mouseLength = oMouseList.length;
    // for (var i = mouseLength - 1; i >= 0; i--) {
    //   var oMouse = oMouseList[i];
    //   console.log(oMouse.num);
    //   oMouse.remove();
    // }

    //删除地鼠的时候，mouseLength的长度是减小的，因此要不断更新类数组的第一个
    for(var i=0;i<mouseLength;i++){
      var j=0;
      var oMouse=oMouseList[j];
      console.log(oMouse.num);
      oMouse.remove();
    }
  },
  handle: function () {
    /**
     * 监听事件
     */
    this.handleHolesMouseDown();
    this.handleHolesMouseUp();
  },
  handleHolesMouseDown: function () {
    /**
     * 鼠标按下
     */
    var self = this;
    this.oHoles.onmousedown = function (e) {
      self.hit('down');//更改鼠标样式
      var dom = e.target;
      var isMouse = dom.classList.contains('mouse');
      var isHole = dom.classList.contains('hole');

      if (isMouse) {
        self.handleMouseClick(dom);
      } else if (isHole) {
        self.handleHoleClick();
      }
    }
  },
  handleHolesMouseUp: function () {
    /**
     * 鼠标抬起
     */
    var self = this;
    this.oHoles.onmouseup = function () {
      self.hit('up');
    }
  },
  hit: function (state) {
    /**
     * 更改鼠标图标
     */
    var oHoles = this.oHoles;
    var cursor = state === 'down' ? "url('./image/hammerdown.ico'), auto" : "url('./image/hammer.ico'), auto";
    oHoles.style.cursor = cursor;
  },
  handleMouseClick: function (oMouse) {//鼠标按下的时候会调用
    /**
     * 点击鼠
     */
    var num = oMouse.num;
    //当砸中该地鼠的时候，会将当前地鼠的索引值添加到原来的数组中，为了确保数组的长度正常，能够随机生成位置
    this.randomArr.push(num);
    this.renderBoom(oMouse);
    this.addScore(100);
    oMouse.remove();
  },
  handleHoleClick: function () {
    /**
     * 点击洞
     */
    this.addScore(-500);
  },
  renderBoom: function (oMouse) {
    /**
     * 渲染boom元素
     */
    var oHole = oMouse.parentNode;//当前点击的地鼠所在的坑
    var oBoom = document.createElement('div');
    oBoom.setAttribute('class', 'boom');
    oHole.appendChild(oBoom);
    setTimeout(function () {
      oBoom.remove();
    }, 300)
  },
  addScore: function (num) {
    /**
     * 添加分数
     */
    this.score += num;
    this.renderScore();
    this.judgeResult();
  },
  judgeResult: function () {
    /**
     * 判断结果
     */
    var score = this.score;
    if (score < 0) {
      this.failGame();
    } else if (score >= 0 && score < 300) {
      this.level(1);
    } else if (score >= 300 && score < 600) {
      this.level(2);
    } else if (score >= 600 && score < 1000) {
      this.level(3);
    } else {
      this.winGame();
    }
  },
  level: function (level) {
    /**
     * 改变级别
     */
    if (this.speed === 1000 / level) {
      return
    };
    var self = this;
    this.speed = 1000 / level;//根据等级得到新的时间差
    clearInterval(this.timer);//等级改变了之后，会清除原来的定时器
    this.timer = setInterval(function () {//新的定时器
      self.showMouse();
    }, this.speed)
  },
  winGame: function () {
    /**
     * 游戏胜利
     */
    clearInterval(this.timer);
    setTimeout(function () {
      alert('你赢了');
    }, 300)
  }
}