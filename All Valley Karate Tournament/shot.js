class Shot{
    constructor(x, y, type, isPlayer){
        this.x = x;
        this.y = y;
        this.h = 40;
        this.type = type;
        this.history = [];
        this.isPlayer = isPlayer;
    }

    show(){
        if (this.type === "water"){
            stroke(0, 0, 200);
        }
        if(this.type === "ice"){
            stroke(255);
        }
        if(this.type === "fire"){
            stroke(200, 0, 0);
        }
        strokeWeight(20);
        point(this.x, this.y);

        for (let i = 0; i < this.history.length; i++){
            let pos = this.history[i];
            strokeWeight(i);
            point(pos.x, pos.y);
        }
    }

    move(){
        if (this.isPlayer){
            this.x += 25;
        }else{
            this.x += -25;
        }
        
        let v = createVector(this.x, this.y);
        this.history.push(v);

        if (this.history.length > 20){
            this.history.splice(0, 1);
        }
    }

    done(){
        if (this.isPlayer){
            if (this.x > enemy.x - enemy.h/2){
                return true;
            }else{
                return false;
            }
        }else{
            if (this.x < player.x + player.h/2){
                return true;
            }else{
                return false;
            }
        }
    }

    hit(object){
        let d = dist(this.x, this.y, object.x, object.y);
        if (d <= this.h/2 + object.h/2){
            return true;
        }else{
            return false;
        }
    }
}