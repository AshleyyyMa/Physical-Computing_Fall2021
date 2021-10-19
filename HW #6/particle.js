class Particle{
    constructor(x, y, hue, firework){
        this.pos = createVector(x,y);
        this.firework = firework; //?
        this.lifetime = 255;
        this.hue = hue;

        if (this.firework){
            this.vel = createVector(0,random(-12, -5));
            this.acc = createVector(random(-0.9, 0.9), 0);
        }else{
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(2,20));
            this.acc = createVector(0,0);
        }

    }

    applyForce(force){
        this.acc.add(force);
    }

    update(){
        if (!this.firework){
            this.vel.mult(random(0.8, 0.95));
            this.lifetime -= random(5);
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0)
    }

    done(){
        if (this.lifetime <0){
            return true;
        }else{
            return false;
        }
    }

    show(){
        colorMode(HSB);
        if (!this.firework){
            strokeWeight(2);
            stroke(this.hue, 60, 100, this.lifetime);
        }else{
            strokeWeight(4);
            stroke(255);
        }
        
        point(this.pos.x, this.pos.y);
    }
}