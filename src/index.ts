import Circle from "./Circle"

const radius: number = 10
let canvas= document.getElementById('canvas') as HTMLCanvasElement;
let ctx  = canvas.getContext('2d') as CanvasRenderingContext2D;

document.addEventListener('DOMContentLoaded', () => {
    const canv = document.getElementById('canvas') as HTMLCanvasElement;
    const ct = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas = canv;
    ctx = ct;
});


// Array to store circle instances
const circles: Circle[] = [];
let lastTime:number = 0;

//function for get a unique number in the range from 0 to 15
function getNumber(circles:Circle[]):string
{
    let i:number = 0;
    while(circles.length > i)
    {
        if (!circles.find((circl)=>circl.number === i.toString()))
            return (i+"")
        ++i;
    }
    return (i+"")
}

// Function to create new circle instances
function createCircle(x: number, y: number)
{
    let numberNewCircle = getNumber(circles);           //get number element
    const newCircle = new Circle(x, y, radius, 0, numberNewCircle,  ctx);
    circles.push(newCircle);
}


// Function to handle user click event and spawn new circles
canvas.addEventListener('click', (event) => {
  const mouseX = (event.clientX - canvas.getBoundingClientRect().left) / 2.5;
  const mouseY = (event.clientY - canvas.getBoundingClientRect().top) / 2.4;
  createCircle(mouseX ,  mouseY);
});



// Game loop to update and render circles
function tick(currentTime: number) {
    const deltaTime = currentTime - lastTime;          //delta time

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.fillText("Click me", canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "red";
    Circle.quantityCheckCircle(circles);              //if 15 > number
    Circle.ifTwoSecondsAboveTheFloor(circles);        //on the floor 2 seconds to be

    // Update and render each circle
    for (let i = 0; i < circles.length; i++) {
        circles[i].update(canvas, deltaTime);
    }


    lastTime = currentTime;
    requestAnimationFrame(tick);
}

// Start the game loop
requestAnimationFrame(tick);
