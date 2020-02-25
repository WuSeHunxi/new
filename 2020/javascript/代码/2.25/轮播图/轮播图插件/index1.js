(function () {

    //创建一个构造函数是为了生产轮播图的工厂
    function Swiper(options, wrap) {
        this.list = options.list || [];
        this.num = this.list.length;
        this.type = options.type || 'fade';
        this.nowIndex = 0;//当前轮播内容的索引
        this.isAuto = options.isAuto == undefined ? true : options.isAuto;
        this.showChangeBtn = options.showChangeBtn == undefined ? true : options.showChangeBtn;
        this.showSpotBtn = options.showSpotBtn == undefined ? true : options.showSpotBtn;
        this.width = options.width || $(wrap).width();
        this.height = options.height || $(wrap).height();
        this.autoTime = options.autoTime || 2000;//自动轮播的时间
        this.direction = options.direction || 'right';
        //作用域，确保不同的轮播图之间不互相影响
        this.wrap = wrap || $('body');
        this.timer = null;
        this.init = function () {//直接通过一个方法调用其他所有方法的执行
            this.createDom();
            this.initStyle();
            this.bindEvent();
            if (this.isAuto) {
                this.autoChange()
            }
        }
    }

    //该方法是为了创建轮播图的结构
    Swiper.prototype.createDom = function () {
        //创建该div结构是为了方便判断此时的轮播图是animate的还是fade的。
        var mySwiperDiv = $('<div class="my-swiper"></div>');
        //轮播内容存放的位置
        var mySwiperUl = $('<ul class="my-swiper-list"></ul>');
        //小圆点区域
        var mySwiperSpots = $('<div class="my-swiper-spots"></div>')
        for (var i = 0; i < this.list.length; i ++) {
            var item = this.list[i];//轮播的内容(图片)
            $('<li class="my-swiper-item"></li>').append($(item))
                                                 .appendTo(mySwiperUl);
            $('<span></span>').appendTo(mySwiperSpots);
        }

        //无缝轮播需要多加一张图片，通过深度克隆的方法克隆第一张图片
        if (this.type == 'animate') {
            $('<li class="my-swiper-item"></li>').append($(this.list[0]).clone(true))
                                                 .appendTo(mySwiperUl);
        }

        mySwiperDiv.append(mySwiperUl)
                   .append($('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>'))
                   .append($('<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>'))
                   .append(mySwiperSpots)
                   .appendTo(this.wrap)
                   .addClass('my-swiper-' + this.type)//添加类名，使其更好的判断是哪一种轮播
    }
    
    Swiper.prototype.initStyle = function () {
        if (this.type == 'animate') {
            $('.my-swiper-animate > .my-swiper-list', this.wrap).css({
                width: (this.num  + 1)* this.width
            }).find('.my-swiper-item').css({
                width: this.width,
                height: this.height
            })
        } else {
            $('.my-swiper-fade > .my-swiper-list > .my-swiper-item', this.wrap).hide().eq(this.nowIndex).show()
        }
        if (!this.showChangeBtn) {
            $('.my-swiper-btn', this.wrap).hide();
        }
        if (!this.showSpotBtn) {
            $('.my-swiper-spots').hide();
        }
        //设置小圆点选中的样式
        $('.my-swiper-spots > span', this.wrap).eq(this.nowIndex).addClass('active')
    }
    //事件处理函数
    Swiper.prototype.bindEvent = function () {
        var self = this;//this的指向发生改变
        //移入移出事件处理
        $('.my-swiper', this.wrap).mouseenter(function () {
            clearInterval(self.timer)
        }).mouseleave(function () {
            if (self.isAuto) {
                self.autoChange();
            }
        });
        $('.my-swiper-lbtn', this.wrap).click(function (e) {
            if (self.nowIndex == 0) {
                self.nowIndex = self.num - 1;
            } else {
                self.nowIndex --;
            }
            self.change()
        })
        $('.my-swiper-rbtn', this.wrap).click(function (e) {
            if (self.nowIndex == self.num - 1) {
                self.nowIndex = 0;
            } else {
                self.nowIndex ++;
            }
            self.change()
        });
        $('.my-swiper-spots > span', this.wrap).mouseenter(function () {
            self.nowIndex = $(this).index();
            self.change()
        })
    }
    Swiper.prototype.change = function () {
        //运动事件要判断轮播图的类型
        if (this.type == 'fade') {
            $('.my-swiper-item', this.wrap).fadeOut().eq(this.nowIndex).fadeIn();
            $('.my-swiper-spots > span', this.wrap).removeClass('active').eq(this.nowIndex).addClass('active')
        }
    }

    Swiper.prototype.autoChange = function () {
        var self = this;
        this.timer = setInterval(function () {
            if (self.direction == 'right') {
                $('.my-swiper-rbtn', self.wrap).click();
            } else {
                $('.my-swiper-lbtn', self.wrap).click();
            }
        }, this.autoTime)
    }
 
    $.fn.extend({
        swiper: function (options) {
            var obj = new Swiper(options, this);
            obj.init();
        }
    })
})()