function Puzzle(options){
    this.el=options.el;
    this.width=options.data.width;
    this.height=options.data.height;
    this.row=options.data.row;
    this.col=options.data.col;
    this.img=options.data.img;
    this.init();
}

Puzzle.prototype={
    init(){
        this.initData();
        // console.log(0)
    },
    initData(){
        this.el.style.width=this.width+"px";
        this.el.style.height=this.height+"px";
        this.dom=document.createElement("div");
        this.dom.className="block";
        this.dom.style.width=this.width/this.row+"px";
        this.dom.style.height=this.height/this.col+"px";
        this.el.appendChild(this.dom);
        // this.dom.style.backgroundPosition="0px 0px";
    }
}