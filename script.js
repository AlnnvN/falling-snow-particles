const canvas = setupCanvas()
const ctx = canvas.getContext('2d')
let dpi = window.devicePixelRatio;

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

var interval = 10000/Math.sqrt(parseInt(canvas.width)*parseInt(canvas.height)/8)*Math.sqrt(window.devicePixelRatio)


var snowParticles = []

start();

function start(){
    update()
    createParticle(interval)
}

function createParticle(){
   
    var acceleration = {
        x: 5*Math.sqrt(Math.sqrt(window.devicePixelRatio*canvas.width*canvas.height))/1000,
        y: 7.5*Math.sqrt(Math.sqrt(window.devicePixelRatio*canvas.width*canvas.height))/1000
    }

    setInterval(()=>{
        snowParticles.push(
            new Snow(
                randomXPos(),
                -10, 
                randomRadius(), 
                randomColor(), 
                randomAcceleration()
            )
        );
    },interval)

    function randomXPos(){
        return Math.floor(Math.random() * (canvas.width+canvas.width*0.20)) - Math.floor(canvas.width*0.20)
    }

    function randomColor(){
        index = Math.floor(Math.random()*(Snow.getColors().length))
        return Snow.getColors()[index]
    }

    function randomRadius(){
        return  Math.floor(Math.random() * 300/Math.sqrt(Math.sqrt(window.devicePixelRatio*canvas.width*canvas.height)))
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
        if(element.getPos().y > canvas.height+10 || element.getPos().x > canvas.width+10){
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

function setupCanvas(){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = Math.ceil(window.devicePixelRatio);
    const canvas = document.querySelector('canvas');

    canvas.width = width*ratio;
    canvas.height = height*ratio;

    canvas.style.width = width+'px';
    canvas.style.height = height+'px';

    canvas.getContext('2d').setTransform(ratio,0,0,ratio,0,0);
    return canvas;
}
