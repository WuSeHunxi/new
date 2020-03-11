/***
 * 
 * canvas  实现画板功能
 * 
 * nan.xue
 */



var drawingBoard = {
    cavs: document.getElementById('cavs'),
    ctx: document.getElementById('cavs').getContext('2d'),
    ulNode: document.getElementsByTagName('ul')[0],
    // liList:this.ulNode.getElementsByTagName("li"),-->这里的this指的是window
    colorBtn: document.getElementById('color'),
    lineRuler: document.getElementById('lineRuler'),
    imgArr: [],
    init: function () {
        console.log(this.liList);
        console.log(this.ctx);
        this.ctx.lineCap = 'round'; //线条起始和结尾样式
        //属性设置或返回所创建边角的类型，当两条线交汇时。
        this.ctx.lineJoin = 'round'; //转弯
        this.drawing();
        // console.log(this.ctx);
        this.btnsFnAll();
    },
    drawing: function () {//利用的是鼠标事件
        var self = this;
        var left = this.cavs.offsetLeft;
        this.cavs.onmousedown = function (e) {
            var e_x = e.pageX;
            var e_y = e.pageY;
            self.ctx.beginPath();
            self.ctx.moveTo(e_x - left, e_y - left);//top和left的值是一样的
            //返回 ImageData 对象，该对象拷贝了画布指定矩形的像素数据。
            var img = self.ctx.getImageData(0, 0, self.cavs.offsetWidth, cavs.offsetHeight);
            console.log(img);
            self.imgArr.push(img);

            document.onmousemove = function (e) {
                self.ctx.lineTo(e.pageX - left, e.pageY - left);
                self.ctx.stroke();
            }
            document.onmouseup = function () {
                this.onmousemove = null;
                self.ctx.closePath();
            }

            this.onmouseleave = function () {
                this.onmousemove = null;

            }
        }
    },
    btnsFnAll: function () {
        var self = this;
        this.ulNode.addEventListener('click', function (e) {
            console.log(e.target.id);
            switch (e.target.id) {
                case "cleanBoard":
                    //清屏
                    self.ctx.clearRect(0, 0, self.cavs.offsetWidth, cavs.offsetHeight)
                    break;
                case "eraser":
                    //橡皮--->利用白色的画笔实现
                    self.ctx.strokeStyle = "#ffffff";

                    break;
                case "rescind":
                    //撤销
                    if (self.imgArr.length > 0){
                        //将图像数据（从指定的 ImageData 对象）放回画布上 0,0是左上角的值
                        self.ctx.putImageData(self.imgArr.pop(), 0, 0);
                    }                  
                    break;
            }
        });
        this.colorBtn.onchange = function () {
            self.ctx.strokeStyle = this.value;

        }

        this.lineRuler.onchange = function () {
            self.ctx.lineWidth = this.value;

        }

    }

}

drawingBoard.init();