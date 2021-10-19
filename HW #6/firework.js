class Firework{
    constructor(x,col){
        this.col = col;
        this.hue = random(this.col - 25, this.col + 25); //change the color
        this.x = x;
        this.fireworkSound2 = loadSound("Fireworks-Crackling.mp3");
        this.firework = new Particle(this.x, height, this.hue, true);
        this.exploded = false;
        this.particles = [];
        
    }
    

    done(){
        if (this.exploded && this.particles.length === 0){
            return true;
        }else{
            return false;
        }
    }

    update(){
        if (!this.exploded){
            this.firework.applyForce(gravity);
            this.firework.update();
            if (this.firework.vel.y >= 0){
                this.exploded = true;
                this.explode();
            }
        }
        for (let i = this.particles.length - 1; i >= 0; i--){ //?
            this.particles[i].applyForce(gravity);
            this.particles[i].update();
            if (this.particles[i].done()){
                this.particles.splice(i, 1);
            }
        }
    }

    explode(){
        for (let i = 0; i < 100; i++){
            let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hue, false);
            this.particles.push(p);
        }
        this.fireworkSound2.play();
    }

    show(){
        if (!this.exploded){
            this.firework.show();
        }
        for (let i = 0; i < this.particles.length; i++){ //?
            this.particles[i].show();
        }
    }
}