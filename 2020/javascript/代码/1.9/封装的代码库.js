//封装一个方法,实时得到滚动条的距离
function getScrollOffset(){
    if(window.pageXOffset){
        return {
            x:window.pageXOffset,
            y:window.pageYOffset
        }
    }else{
        return {
            x:document.body.scrollLeft+document.documentElement.scrollLeft,
            y:document.body.scrollTop+document.documentElement.scrollTop
        }
    }
}