// 插件封装 可维护 复用 交互性
//向上按钮--》 参数 当前插件的 作用 效果 {
//     isBack: true, // 可选属性，控制是否返回顶部
//     scrollTop: 0, //可选属性 滚动条高度为多少时出现
//     position: "left", //可选属性 控制当前按钮在内容区域的位置
//     width: 1000, //可选属性 当前网页内容区域的宽度
//     offset: 0, //可选属性 距离内容区的距离
//     speed: 800, //可选属性 滚动速度
//     ifShow: true //默认是否显示
//     bottom: 100 //距离下边框位置
// }
//向上按钮
(function($) {
    // $().backBtn()
    $.fn.extend({
        "backBtn": function(options) {
            var obj = {
                isBack: true,
                scrollTop: 0,
                position: "right",
                width: 1000,
                offset: 0,
                speed: 300,
                ifShow: false,
                bottom: 100
            }
            var ops = $.extend(obj, options); // 对象融合，传递的属性会替换默认属性，属性集合
            var $Win = $(window),
                $dom = $(this);
            var func = {
                /**
                 * 1.获取想要的值
                 * 2.设置想要的值
                 * 3.实现想要的功能
                 */
                getLeft: function() {
                    var left; //距离
                    var ww = $Win.width(); //当前窗口宽度
                    var dw = $dom.outerWidth(); //当前元素宽度
                    if (ops.position == "left") {
                        left = (ww - ops.width) / 2 - dw - ops.offset;
                    } else if (ops.position == "right") {
                        //left=左边区域+内容区+元素距离内容区距离
                        left = (ww - ops.width) / 2 + ops.width + ops.offset;
                    }
                    return left;
                },
                getTop: function() {
                    var top;
                    var wh = $Win.height();
                    var dh = $dom.outerHeight();
                    top = wh - dh - ops.bottom;
                    return top;
                },
                setPosition: function() {
                    var L = this.getLeft();
                    var T = this.getTop();
                    $dom.css({
                        left: L,
                        top: T
                    })
                },
                init: function() {
                    this.setPosition();
                    if (ops.ifShow) {
                        $dom.fadeIn(300);
                    } else {
                        $dom.fadeOut(300);
                    }
                    $Win.resize(function() {
                        func.setPosition();
                    })
                    $Win.scroll(function() {
                        if ($(window).scrollTop() > ops.scrollTop) {
                            $('#backTop').fadeIn(300);
                        } else {
                            $('#backTop').fadeOut(300);
                        }
                    })
                    if (ops.isBack) {
                        $('#backTop').click(function() {
                            $('html').animate({ scrollTop: 0 }, ops.speed, 'swing')
                        })
                    }
                }
            }
            func.init();
            return $dom;
        }
    })
}(jQuery))