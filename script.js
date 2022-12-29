const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight  


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
    
    static getColors(){
        return [
            '#DFF3E4',
            '#CEE7E6',
            '#A2D6F9',
            '#A9B2AC',
            '#E1EFF6',
            '#B8DBD9',
            '#D0FFCE',
            '#ECCFC3'
        ];
    }

    getPos(){
        return {
            x: this.x,
            y: this.y
        };
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
   

    setInterval(()=>{

        snowParticles.push(new Snow(randomXPos(), 0, randomRadius(), randomColor(), acceleration)) 

    },interval/intensity)

    function randomXPos(){
        return Math.floor(Math.random() * canvas.width)
    }

    function randomColor(){
        index = Math.floor(Math.random()*(Snow.getColors().length))
        return Snow.getColors()[index]
    }

    function randomRadius(){
        return  Math.floor(Math.random() * 3)
    }
}

function update(){
    requestAnimationFrame(update);

    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawCanvas('#171738');

    snowParticles.forEach((element, index) => {
        if(element.getPos().y > canvas.height){
            snowParticles.shift(); //delete particle
        }
        else{
            element.update();
            element.draw();
        }
    })
}


function drawCanvas(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
