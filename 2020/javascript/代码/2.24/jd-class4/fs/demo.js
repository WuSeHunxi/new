(function(){

    var menuList = [{
        titles: ['家用电器'],
        content: {
            tabs: ['家电馆', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件", "曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['手机', '运营商', '数码'],
        content: {
            tabs: ['手机'],
            subs: [{
                title: '手机',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '手表',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['电脑', '办公'],
        content: {
            tabs: ['家电馆', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }, {
        titles: ['家居', '家具', '家装', '厨具'],
        content: {
            tabs: ['家居', '镇乡专卖店', '家电服务'],
            subs: [{
                title: '电视',
                items: ["曲面电视", "超薄电视", "OLED电视", "4K超清电视", "55英寸", "65英寸", "电视配件"]
            }, {
                title: '空调',
                items: ["壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新", "壁挂式空调", "柜式空调", "中央空调", "一级能效空调", "变频空调", "1.5匹空调", "以旧换新"]
            }]
        }
    }];

    function renderMenuDom(data) {
        //文档碎片，虚拟的dom节点
        var frag = document.createDocumentFragment();
        data.forEach(function (item, index) {
            var oLi = $('<li class="menu-item"></li>').data('index', index);
            item.titles.forEach(function (title, index) {
                $('<a href="#"></a>').text(title).appendTo(oLi);
                if (index != item.titles.length - 1) {
                    $('<span>/</span>').appendTo(oLi);
                }
            });
            $(frag).append(oLi);
        });
        $('.menu-list').append($(frag))
    }

    renderMenuDom(menuList);

    var menuTimer=null;
    $('.menu-list').on('mouseenter','li',function(e){
        var index=$(this).data('index');
        var data=menuList[index].content;
        renderMenuContent(data);
        $('.menu-content').show();
        $('.menu-list li').removeClass('menu-item-on');
        $(this).addClass('menu-item-on');
        
    }).mouseleave(function(){
        menuTimer=setTimeout(function(){
            $(".menu-content").hide();
            $('.menu-list li').removeClass('menu-item-on');
        },300)
    })

    $(".menu-content").on('mouseenter',function(){
        clearTimeout(menuTimer);
    }).mouseleave(function(){
        $(this).hide();
        $(".menu-list li").removeClass('menu-item-on');
    })

    function renderMenuContent(data){
        $('.cate-part').empty();
        var frag=document.createDocumentFragment();
        var tabsDiv=$('<div class="tabs"></div>');
        data.tabs.forEach(function(tab,index){
            $('<a href="#"></a>').text(tab)
                    .append('<i class="iconfont">&#xe61a;</i>')
                    .appendTo(tabsDiv);
        })
        var cateDetail=$('<div class="cate-detail"></div>');
        data.subs.forEach(function(sub,index){
            var oDl=$('<dl class="cate-detail-item"></dl>');
            $(`<dt>
            <a href="#">${sub.title}</a>
            <i class="iconfont">&#xe61a;</i>
            </dt>`).appendTo(oDl);
            var oDd=$('<dd class="cate_detail_con"></dd>');
            sub.items.forEach(function(item,index){
                $('<a href="#"></a>').text(item).appendTo(oDd);
            })
            oDl.append(oDd).appendTo(cateDetail);
        })
        $(frag).append(tabsDiv).append(cateDetail).appendTo('.cate-part');
    }
    // renderMenuContent(menuList)
}())