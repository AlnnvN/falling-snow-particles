const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight  
//7180B9

class Snow{
    constructor(x, y, radius, color, acceleration){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.acceleration = acceleration;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){
        
        this.x+= this.acceleration.x;
        this.y+= this.acceleration.y;
        
    }
}

var interval = 1000
var intensity = 10

var acceleration = {
    x: 0,
    y: 1
}

var snowParticles = []

start();


function start(){
    update()
    
    createParticle(interval)
}

function createParticle(){
    /*function randomInterval(){
        return Math.floor(Math.random() * 100000)
    }*/

    setInterval(()=>{
        posX = Math.floor(Math.random() * canvas.width)
        snowParticles.push(new Snow(posX, 0, 2.5, '#DFF3E4', acceleration)) 
    },interval/intensity)
      
    

}

function update(){
    requestAnimationFrame(update);

    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawCanvas('#171738');

    

    snowParticles.forEach(element => {
        element.update();
        element.draw();
    })
}


function drawCanvas(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
