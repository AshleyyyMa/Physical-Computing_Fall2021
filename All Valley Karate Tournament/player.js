class Player{
    constructor(){
        this.w = 288/1.5;
        this.h = 511/1.5;
        this.w1 = 402/1.5;
        this.h1 = 502/1.5;
        this.x = 150;
        this.y = height - this.h;
        this.yVel = 0;
        this.gravity = 1;
        this.xDir = 0;
    }

    jump(){
        this.yVel = -25;
    }

    move(){
        this.y += this.yVel;
        this.yVel += this.gravity;
        this.y = constrain(this.y, - this.h /2, height - this.h - 50);
        this.x += this.xDir*5;
    }

    setDir(dir){
        this.xDir = dir;
    }

    show(){
        image(playerImg, this.x, this.y, this.w, this.h);
    }

    showFight(){
        image(playerFightImg, this.x, this.y, this.w1, this.h1);
    }
}