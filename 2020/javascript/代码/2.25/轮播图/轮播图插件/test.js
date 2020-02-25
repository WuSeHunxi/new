(function () {

    function Swiper(options, wrap) {
        this.list = options.list || [];
        this.type = options.type || 'fade';
        this.isAuto = options.isAuto == undefined ? true : options.isAuto;
        this.showChangeBtn = options.showChangeBtn == undefined ? true : options.showChangeBtn;
        this.showSpotBtn = options.showSpotBtn == undefined ? true : options.showSpotBtn;
        this.width = options.width || $(wrap).width();
        this.height = options.height || $(wrap).height();
        this.autoTime = options.autoTime || 2000;
        this.direction = options.direction || 'right';
        this.wrap = wrap || $('body');
        this.nowIndex = 0;
        this.num = this.list.length;
        this.lock = false;
        this.timer = null;
        this.init = function () {
            this.createDom();
            this.initStyle();
            this.bindEvent();
            if (this.isAuto) {
                this.autoChange();
            }
        }
    }

    Swiper.prototype.createDom = function () {
        console.log("p");
        var mySwiper = $('<div class="my-swiper"></div>');
        var myUllist = $('<ul class="my-swiper-list"></ul>');
        var mySpots = $('<div class="my-swiper-spots"></div>');
        for (var i = 0; i < this.list.length; i++) {
            var item = this.list[i];
            $('<li class="my-swiper-item"></li>').append($(item))
                .appendTo(myUllist);
            $('<span><span>').appendTo(mySpots);
        }
        if (this.type == 'animate') {
            $('<li class="my-swiper-item"></li>').append($(this.list[0]).clone(true))
                .appendTo(myUllist);
        }
        mySwiper.append(myUllist)
            .append($('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>'))
            .append($('<div class="my-swiper-btn my-swiper-rbtn">&lt;</div>'))
            .append(mySpots)
            .appendTo(this.wrap)
            .addClass("my-swiper-" + this.type);
            

    }

    Swiper.prototype.initStyle = function () {
        if (this.type == 'animate') {
            $('.my-swiper-animate > .my-swiper-list', this.wrap).css({
                width: (this.num + 1) * this.width
            }).find('.my-swiper-item').css({
                width: this.width,
                height: this.height
            });
        } else {
            $('.my-swiper-fade> .my-swiper-list>.my-swiper-item', this.wrap).hide().eq(this.nowIndex).show();
        }
        if (!this.showChangeBtn) {
            $('.my-swiper-btn', this.wrap).hide();
        }
        if (!this.showSpotBtn) {
            $('.my-swiper-spots', this.wrap).hide();
        }
        $('.my-swiper-spots > span', this.wrap).eq(this.nowIndex).addClass('active');
    }

    Swiper.prototype.bindEvent = function () {
        var self = this;
        $('.my-swiper', this.wrap).on('mouseenter', function () {
            clearInterval(self.timer);
        }).mouseleave(function () {
            if (self.isAuto) {
                self.autoChange();
            }
        });

        $('.my-swiper-rbtn', this.wrap).on('click', function () {
            if (self.lock) {
                return false;
            }
            self.lock = true;
            if (self.type == 'animate') {
                if (self.nowIndex == 0) {
                    $('.my-swiper-list', self.wrap).css({
                        left: 0
                    })
                    self.nowIndex = 1;
                } else {
                    self.nowIndex++;
                }
            } else {
                if (self.nowIndex == self.num - 1) {
                    self.nowIndex = 0;
                } else {
                    self.nowIndex++;
                }
            }
            self.change();
        });

        $('.my-swiper-lbtn', this.wrap).on('click', function () {
            if (self.lock) {
                return false;
            }
            self.lock = true;
            if (self.type == 'fade') {
                if (self.nowIndex == 0) {
                    self.nowIndex = self.num - 1;
                } else {
                    self.nowIndex--;
                }
            } else {
                if (self.nowIndex = 0) {
                    $('.my-swiper-list').animate({
                        left: -self.num * self.width
                    })
                    self.nowIndex = self.num - 1;
                } else {
                    self.nowIndex--;
                }
            }
            self.change();
        });

        $('.my-swiper-spots>span', this.wrap).on('mouseenter', function () {
            if (self.lock) {
                return false;
            }
            self.lock = true;
            self.nowIndex = $(this).index();
            self.change();
        })
    }

    Swiper.prototype.change = function () {
        var self = this;
        if (this.type == 'animate') {
            $('.my-swiper-list', this.wrap).animate({
                left: -this.nowIndex * this.width
            }, function () {
                self.lock = false;
            })
        } else {
            $('.my-swiper-item',this.wrap).fadeOut().eq(this.nowIndex).fadeIn(function () {
                self.lock = false;
            });
        }
        $('.my-swiper-spots>span', this.wrap).removeClass('active').eq(this.nowIndex % this.num).addClass('active');
    }

    Swiper.prototype.autoChange = function () {
        console.log("p");
        var self = this;
        self.timer = setInterval(function () {
            if (self.direction == 'right') {
                $('.my-swiper-rbtn', this.wrap).click();
            } else {
                $('.my-swiper-lbtn', this.wrap).click();
            }
        }, self.autoTime);
    }

    $.fn.extend({
        swiper: function (options) {
            var obj = new Swiper(options, this);
            obj.init();
        }
    })

}())