import Circle from "./circle"

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


// Array to store circle instances
const circles: Circle[] = [];
let lastTime:number = 0;

// Function to create new circle instances
function createCircle(x: number, y: number) {
    // const radius = Math.random() ;//* 30 + 10; // Random radius between 10  and 40
    // console.log(radius);


    const newCircle = new Circle(x, y, 10, 0, ctx);
    circles.push(newCircle);
}

// Function to handle user click event and spawn new circles
canvas.addEventListener('click', (event) => {
  // console.log("left   =" + canvas.getBoundingClientRect().left);
  // console.log("top    =" + canvas.getBoundingClientRect().top + "\n\n\n ");

  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  createCircle(mouseX, mouseY);
});



// Game loop to update and render circles
function tick(currentTime: number) {
    const deltaTime = currentTime - lastTime; //delta time

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas


    Circle.quantityCheckCircle(circles);//if 15 > number
    // Update and render each circle
    for (let i = 0; i < circles.length; i++) {
        circles[i].update(canvas, deltaTime);
    }


    lastTime = currentTime;
    requestAnimationFrame(tick);
}

// Start the game loop
requestAnimationFrame(tick);
