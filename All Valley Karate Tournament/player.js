class Player{
    constructor(){
        this.h = 150;
        this.x = 150;
        this.y = height - this.h / 2;
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
        this.y = constrain(this.y, 0, height - this.h/2);
        this.x += this.xDir*5;
    }

    setDir(dir){
        this.xDir = dir;
    }

    show(){
        image(playerImg, this.x, this.y, this.h, this.h);
    }

    showHit(){
        image(madImg, this.x, this.y, this.h, this.h);
    }
}