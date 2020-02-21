(function(){

    function Swiper(options,wrap){
        this.list=options.list||[];
        this.num=this.list.length;
        this.type=options.type||'fade';
        this.nowIndex=0;
        this.isAuto=options.isAuto==undefined?true:options.isAuto;
        this.showChangeBtn=options.showChangeBtn==undefined?true:options.isAuto;
        this.showSpotBtn=options.showSpotBtn==undefined?true:options.showSpotBtn;
        this.width=options.width||$(wrap).width();
        this.height=options.height||$(wrap).height();
        this.autoTime=options.autoTime||2000;
        this.direction=options.direction||'right';
        this.wrap=wrap||$('body');
        this.timer=null;
        this.init=function(){
            this.createDom();
            this.initStyle();
            this.bindEvent();
            if(this.isAuto){
                this.autoChange();
            }
        }
    }

    Swiper.prototype.createDom=function(){
        var mySwiperDiv=$('<div class="my-swiper"></div>');
        var mySwiperUl=$('<ul class="my-swiper-list"></ul>');
        var mySwiperSpots=$('<div class="my-swiper-spots"></div>');
        for(var i=0;i<this.num;i++){
            var item=this.list[i];
            $('<li class="my-swiper-item"></li>').append($(item))
                                                 .appendTo(mySwiperUl);
            $('<span></span>').appendTo(mySwiperSpots);
        }

        if(this.type=='animate'){
            $('<li class="my-swiper-item"></li>').append($(this.list[0]).clone(true))
                                                 .appendTo(mySwiperUl);
        }

        mySwiperDiv.append(mySwiperUl)
                   .append($('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>'))
                   .append($('<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>'))
                   .append(mySwiperSpots)
                   .appendTo(this.wrap)
                   .addClass('my-swiper-'+this.type);
    }

    Swiper.prototype.initStyle=function(){
        if(this.type=='animate'){
            $('.my-swiper-animate > .my-swiper-list',this.wrap).css({
                width:(this.num+1)*this.width                
            }).find('.my-swiper-item').css({
                width:this.width,
                height:this.height
            })
        }else{
            $('.my-swiper-fade > .my-swiper-list > .my-swiper-item',this.wrap).hide().eq(this.nowIndex).show();
        }
        if(!this.showChangeBtn){
            $('.my-swiper-btn',this.wrap).hide();
        }
        if(!this.showSpotBtn){
            $('.my-swiper-spots',this.wrap).hide();
        }   
        $('.my-swiper-spots > span',this.wrap).eq(this.nowIndex).addClass("active");
    }

    Swiper.prototype.bindEvent=function(){
        var self=this;
        $('.my-swiper-lbtn',this.wrap).click(function(){
            if(self.nowIndex==0){
                self.nowIndex=self.num-1;
            }else{
                self.nowIndex--;
            }
            self.change();
        })
        $('.my-swiper-rbtn',this.wrap).click(function(){
            if(self.nowIndex==self.num-1){
                self.nowIndex=0;
            }else{
                self.nowIndex++;
            }
            self.change();
        })
        $('.my-swiper-spots > span',this.wrap).mouseenter(function(){
            self.nowIndex=$(this).index();
            self.change();
        })
        $('.my-swiper',this.wrap).mouseenter(function(){
            clearInterval(self.timer);
        }).mouseleave(function(){
            if(self.isAuto){
                self.autoChange();
            }
        })
    }

    Swiper.prototype.change=function(){
        if(this.type=='fade'){
            $('.my-swiper-item',this.wrap).fadeOut().eq(this.nowIndex).fadeIn();
            $('.my-swiper-spots > span',this.wrap).removeClass("active").eq(this.nowIndex).addClass("active");
        }
    }

    Swiper.prototype.autoChange=function(){
        var self=this;
        this.timer=setInterval(function(){
            if(self.direction=='right'){
                $('.my-swiper-rbtn',self.wrap).click();
            }else{
                $('.my-swiper-lbtn',self.wrap).click();
            }
        },this.autoTime)
    }

    $.fn.extend({
        swiper:function(options){
            var obj=new Swiper(options,this);
            obj.init();
        }
    })
}())