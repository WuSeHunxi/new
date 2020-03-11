var canvas={
    // el:null,
    init(options){     
        this.initData(options);
        this.ctx.lineCap='round';
        this.ctx.lineJoin='round';
        this.drawing();
        this.btnDeal();
    },
    initData(options){
        this.el=options.el;
        this.can=this.el.getElementsByTagName("canvas")[0];
        this.ctx=this.can.getContext('2d');
        this.ulNode=this.el.getElementsByTagName("ul")[0];
        this.colorBtn=this.el.getElementsByClassName("colorBtn")[0];
        this.rangeBtn=this.el.getElementsByClassName("rangeBtn")[0];
        this.imgArr=[];
    },
    drawing(){
        var self=this;
        this.can.onmousedown=function(e){
            // console.log(e)
            var x=e.pageX,
                y=e.pageY,
                left=self.can.offsetLeft,
                top=self.can.offsetTop;
            self.ctx.beginPath();
            self.ctx.moveTo(x-left,y-top);
            var img=self.ctx.getImageData(0,0,self.can.offsetWidth,self.can.offsetHeight);
            self.imgArr.push(img);
            // console.log(img)

            document.onmousemove=function(e){
                self.ctx.lineTo(e.pageX-left,e.pageY-top);
                self.ctx.stroke();
            }
            document.onmouseup=function(){
                document.onmousemove=null;
                self.ctx.closePath();
                // self.ctx.stroke();
            }
        }
    },
    btnDeal(){
        //出现事件冒泡，利用事件委托
        var self=this;
        this.ulNode.onclick=function(e){
            // console.log(e.target.className);
            switch (e.target.className){
                case "eraser":
                    self.ctx.strokeStyle='#fff';
                    break;
                case 'clear':
                    self.ctx.clearRect(0,0,self.can.offsetWidth,self.can.offsetHeight);
                    break;
                case 'reset':
                    if(self.imgArr.length>0){
                        self.ctx.putImageData(self.imgArr.pop(),0,0);
                    }
                    break;
            }
        }

        this.colorBtn.onchange=function(){
            self.ctx.strokeStyle=this.value;
        }

        this.rangeBtn.onchange=function(){
            self.ctx.lineWidth=this.value;
        }
    }
}