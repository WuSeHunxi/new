var main = $('#main'),
    go = $('#go'),
    speed = 5,
    num = 0,
    timer,
    flag = true,//游戏结束后不能点击
    colors = ['#1AAB8A', '#E15650', '#121B39', '#80A84E'];

function cDiv() {
    var oDiv = $('<div></div>');
    var index = Math.floor(Math.random() * 4);
    oDiv.attr('class', 'row');
    for (var j = 0; j < 4; j++) {
        var iDiv = $('<div></div>');
        oDiv.append(iDiv);
    }
    if (main.children().length == 0) {
        main.append(oDiv);
    } else {
        //将新创建的元素插入到最前面
        oDiv.insertBefore(main.children()[0]);
    }
    var clickDiv = oDiv.children()[index];
    // console.log(oDiv.children())
    $(clickDiv).css('backgroundColor', colors[index]);
    $(clickDiv).attr('class', 'i')
}

function move() {
    clearInterval(timer);
    timer = setInterval(function () {
        var step = parseInt(main.css('top')) + speed;
        main.css('top', step + 'px');
        if (parseInt(main.css('top')) >= 0) {
            cDiv();
            main.css({
                'top': '-150px'//为了让新生成的先不显示
            })
            // console.log(main.offset().top)
        }
        var len = main.children().length;
        console.log(len);
        if (len == 6) {
            for (var i = 0; i < len; i++) {
                if ($(main.children()[len - 1].children[i]).hasClass('i')) {
                    alert('游戏结束，得分：' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            //每次都删除最前面的那个，不要存在过多的不需要的dom结构
            $(main.children()[len - 1]).remove();
        }
    }, 20)
    bindEvent();
}

function bindEvent() {
    //事件委托
    main.on('click', function (event) {
        if (flag) {
            var tar = event.target;
            if (tar.className == 'i') {
                $(tar).css('backgroundColor', '#bbb');
                $(tar).removeClass();//删除类名
                num++;
            } else {
                alert('游戏结束，得分：' + num);
                clearInterval(timer);
                flag = false;
            }
            if (num % 10 == 0) {
                speed++;
            }
        }
    })
}

function clickStart() {
    $('a').on('click', function () {
        $('a').css('display', 'none');
        move();
    })
}
clickStart();