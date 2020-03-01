
function Swiper(options,wrap){
    this.list=options.list||[];
    this.type=options.type||'fade';
    this.isAuto=options.isAuto==undefined?true:options.isAuto;
    this.showChangeBtn=options.showChangeBtn==undefined?true:options.showChangeBtn;
    this.showSpotBtn=options.showSpotBtn==undefined?true:options.showSpotBtn;
    this.autoTime=options.autoTime||options.autoTime;
    this.width=options.width;
    this.height=options.height;
    this.wrap=wrap||$('body');
    this.len=this.list.length;
    this.num=this.len-1;
    this.nowIndex=0;
}

Swiper.prototype.init=function(){
    this.createDom();
    this.initStyle();
    this.bindEvent();
}

Swiper.prototype.createDom=function(){
    // console.log("p");
    var mySwiper=$('<div class="my-swiper"></div>');
    var myUl=$('<ul class="my-swiper-list"></ul>');
    var mySwiperSpots = $('<div class="my-swiper-spots"></div>')
    for(var i=0;i<this.len;i++){
        var item=this.list[i];
        $('<li class="my-list-item"></li>').append($(item))
                                           .appendTo(myUl);
        $('<span></span>').appendTo(mySwiperSpots);
    }
    if(this.type=='animate'){
        $('<li class="my-list-item"></li>').append($(this.list[0]).clone(true)).appendTo(myUl);
    }
    mySwiper.append(myUl)
            .append($('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>'))
            .append($('<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>'))
            .append(mySwiperSpots)
            .appendTo(this.wrap)
            .addClass("my-swiper-"+this.type);
}

Swiper.prototype.initStyle=function(){
    if(this.type=='animate'){
        $('.my-swiper-list').css({
            width:(this.len+1)*$(".my-list-item").width(),
            height:$('.my-list-item').height()
        })
    }else{
        $('.my-list-item',this.wrap).hide().eq(this.nowIndex).fadeIn();
    }

    if(!this.showChangeBtn){
        $('.my-swiper-btn',this.wrap).hide();
    }

    if(!this.showSpotBtn){
        $('.my-swiper-spots span',this.wrap).hide();
    }

    $('.my-swiper-spots span').removeClass('active').eq(this.nowIndex).addClass("active");
}

Swiper.prototype.bindEvent=function(){
    var self=this;
    $('.my-swiper-lbtn',this.wrap).click(function(){
        if(self.type=='animate'){
            if(self.nowIndex==0){
                $('.my-swiper-list',self.swiper).css({
                    left:-self.width*(self.len)
                })
                self.nowIndex=self.num;
            }else{
                self.nowIndex--; 
            }   
            $('.my-swiper-list',self.wrap).animate({
                left:-self.nowIndex*self.width
            })
        }else{
            if(self.nowIndex==0){
                self.nowIndex=self.num;
            }else{
                self.nowIndex--;
            }
            $('.my-list-item',self.wrap).fadeOut().eq(self.nowIndex).fadeIn();
        }
        $('.my-swiper-spots span').removeClass("active").eq(self.nowIndex%self.len).addClass('active');
    })

    $('.my-swiper-rbtn').click(function(){
        if(self.type=='animate'){
            if(self.nowIndex==self.num){
                $('.my-swiper-list',self.wrap).css({
                    left:0
                })
                self.nowIndex=1;
            }else{
                self.nowIndex++; 
            }   
            $('.my-swiper-list',self.wrap).animate({
                left:-self.nowIndex*self.width
            })
        }else{
            if(self.nowIndex==self.num){
                self.nowIndex=0;
                console.log(self.num);
            }
            self.nowIndex++;
            $('.my-list-item',self.wrap).fadeOut().eq(self.nowIndex).fadeIn();
        }
        $('.my-swiper-spots span').removeClass("active").eq(self.nowIndex%self.len).addClass('active');
    })

    $('.my-swiper-spots span').mouseenter(function(){
        self.nowIndex=$(this).index();
        $('.my-swiper-spots span').removeClass("active").eq(self.nowIndex).addClass('active');
        if(self.type=='animate'){
            $('.my-swiper-list',self.wrap).animate({
                left:-self.nowIndex*self.width
            })
        }
        // else{
        //     $('.my-list-item',this.wrap).fadeOut().eq(this.nowIndex).fadeIn();
        // }
    })

    $('.my-swiper',this.wrap).mouseenter(function(){

    })

    $('.my-swiper',this.wrap).mouseleave(function(){

    })
}


$.fn.extend({
    swiper:function(options){
        var obj=new Swiper(options,this);
        obj.init();
    }
})