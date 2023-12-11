// import confetti from 'canvas-confetti';

// confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
//   resize: true,
//   useWorker: true,
// })({ particleCount: 200, spread: 200 });
import Circle from "./Circle"

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;


// Array to store circle instances
const circles: Circle[] = [];
let lastTime:number = 0;


// Function to create new circle instances
function createCircle(x: number, y: number) {
    const radius = Math.random() * 30 + 10; // Random radius between 10 and 40
    const newCircle = new Circle(x, y, radius,0, ctx);
    circles.push(newCircle);
}

// Function to handle user click event and spawn new circles
canvas.addEventListener('click', (event) => {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;
  createCircle(mouseX, mouseY);
});



// Game loop to update and render circles
function tick(currentTime: number) {
    const deltaTime = currentTime - lastTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    
    // Update and render each circle
    for (let i = 0; i < circles.length; i++) {
        circles[i].update(canvas);
    }
    console.log(deltaTime);
    lastTime = currentTime;
    requestAnimationFrame(tick);
}

// Start the game loop
requestAnimationFrame(tick);
