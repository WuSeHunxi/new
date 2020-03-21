const birdDom = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector(".game");
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birDom);

        this.g = 1500;
        this.swingStatus = 1;
        this.maxY = gameHeight - landHeight - this.height;
        this.render();
    }

    move(duration) {
        super.move();
        this.ySpeed += this.g * duration;
    }

    onMove() {
        if (this.top > this.maxY) {
            this.top = this.maxY;
        } else if (this.top <= 0) {
            this.top = 0;
        }
    }
}