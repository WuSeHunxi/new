class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
    }
    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }

    move(duration) {
        this.left = this.left + this.xSpeed * duration;
        this.top = this.top + this.ySpeed * duration;
        if (this.onMove) {
            this.onMove();
        }
        this.render();
    }
}