class Shot{
    constructor(x, y, w, h, type, isPlayer){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = 20;
        this.type = type;
        this.history = [];
        this.isPlayer = isPlayer;
        this.toDelete = false;
        this.showImg; 
    }

    show(){
        if (this.type === "water"){
            if(this.isPlayer){
                this.showImg = blueImg1;
                this.showImg.resize(waterValue * 150, 0);
            }else{
                this.showImg = blueImg;
            }
        }
        if(this.type === "ice"){
            if(this.isPlayer){
                this.showImg = redImg1;
                this.showImg.resize(iceValue * 150, 0);
            }else{
                this.showImg = redImg;
            }
        }
        if(this.type === "fire"){
            if(this.isPlayer){
                this.showImg = yellowImg1;
                this.showImg.resize(fireValue * 150, 0);
            }else{
                this.showImg = yellowImg;
            }
        }
        //strokeWeight(this.r);
        //point(this.x + (this.w/2), this.y + (this.h/2) + 75);
        imageMode(CENTER);
        image(this.showImg, this.x + (this.w/2), this.y + (this.h/2) + 75);
        imageMode(CORNER);

        // for (let i = 0; i < this.history.length; i++){
        //     let pos = this.history[i];
        //     strokeWeight(i);
        //     point(pos.x + (this.w/2), pos.y + (this.h/2) + 75);
        // }
    }

    move(){
        if (this.isPlayer){
            this.x += 25;
        }else{
            this.x += -25;
        }
        
        // let v = createVector(this.x, this.y);
        // this.history.push(v);

        // if (this.history.length > 20){
        //     this.history.splice(0, 1);
        // }
    }

    done(){
        if (this.isPlayer){
            if (this.x > enemy.x - enemy.w){
                this.toDelete = true;
                return true;
            }else{
                return false;
            }
        }else{
            if (this.x < player.x + player.w/2){
                return true;
            }else{
                return false;
            }
        }
    }

    hit(object){
        if (this.isPlayer){
            let d = dist(this.x, this.y, object.x + (object.w/2), object.y + (object.h/2));
            let a = (object.w * object.w) + (object.h * object.h);
            if (d < this.r + sqrt(a)){
                return true;
            }else{
                return false;
            }
            // if (this.x ){
            //     return true;
            // }else{
            //     return false;
            // }
        }else{
            if (this.x < object.x + object.w && this.y < object.y + object.h - 100){
                return true;
            }else{
                return false;
            }
        }

    }

    disappear(){
        this.toDelete = true;
    }
}