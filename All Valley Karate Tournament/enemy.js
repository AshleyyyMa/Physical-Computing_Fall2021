class Enemy{
    constructor(){
        this.h = 150;
        this.x = width - this.h - 50;
        this.y = height - this.h/2;
    }

    show(){
        image(enemyImg, this.x, this.y, this.h, this.h);
    }
}