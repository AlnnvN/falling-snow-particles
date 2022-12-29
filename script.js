const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let dpi = window.devicePixelRatio;

canvas.width = window.innerWidth
canvas.height = window.innerHeight  

function fix_dpi() {
    
    let height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    
    let width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    
    canvas.setAttribute('height', height * dpi);
    canvas.setAttribute('width', width * dpi);
}

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

var interval = 2000
var intensity = 25


var snowParticles = []

start();

function start(){
    fix_dpi()
    update()
    createParticle(interval)
}

function createParticle(){
   
    var acceleration = {
        x: 0.2/2,
        y: 0.3/2
    }

    setInterval(()=>{
        snowParticles.push(
            new Snow(
                randomXPos(),
                0, 
                randomRadius(), 
                randomColor(), 
                randomAcceleration()
            )
        );
    },interval/intensity)

    function randomXPos(){
        return Math.floor(Math.random() * canvas.width)
    }

    function randomColor(){
        index = Math.floor(Math.random()*(Snow.getColors().length))
        return Snow.getColors()[index]
    }

    function randomRadius(){
        return  Math.floor(Math.random() * 5)
    }

    function randomAcceleration(){
        return {
            x: Math.random() * (acceleration.x*2),
            y: Math.random() * (acceleration.y*2) + acceleration.y
        }
    }
}

function update(){
    requestAnimationFrame(update);

    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawCanvas('#171738');

    snowParticles.forEach((element, index) => {
        if(element.getPos().y > canvas.height || element.getPos().x > canvas.width){
            snowParticles.splice(index,1)
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
