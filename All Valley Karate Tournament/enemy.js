class Enemy{
    constructor(){
        this.w = 270/1.6;
        this.h = 505/1.6;
        this.w1 = 406/1.6;
        this.h1 = 516/1.6;
        this.x = width - this.w - 150;
        this.y = height - this.h;
    }

    show(){
        image(enemyImg, this.x, this.y, this.w, this.h);
        this.y = constrain(this.y, - this.h , height - this.h - 50);
    }

    showFight(){
        image(enemyFightImg, this.x, this.y, this.w1, this.h1);
    }

    move(){

    }
}