var pageEngine={
    /**
     * 
     * @param {*} selector 以谁为核心进行页面的创建
     * @param {*} colorsArray 给每一个分页背景颜色
     */
    init:function(selector,colorsArray){
        this.$W=$(selector);//给该对象添加属性，使它成为全局的属性
        this.colorsArray=colorsArray;
        return this;//方便链式调用
    },
    addSection:function(className){
        this.$Page=$('<div class="section"></div>').addClass(className);
        this.$Page.appendTo(this.$W);
        return this;
    },
    addSlide:function(className){
        this.$Slide=$('<div class="slide"></div>').addClass(className);
        this.$Slide.appendTo(this.$W);
        return this;
    },
    addComponent:function(){
        ComponentFactory(config);
    }
}