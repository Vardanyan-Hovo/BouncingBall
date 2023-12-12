// Circle class to represent each circle object
export default class Circle {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public speed: number = 0,
        private ctx: CanvasRenderingContext2D // Accept ctx as a parameter
        ) {}

    //properties
    gravity:number = 9.8; // Earth-like gravity  F = mg m/vˆ2
    dampeningFactor = 0.8; // Dampening effect on bounce



    public draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);// with radian PI
        this.ctx.fillStyle = 'blue'; // Circle color
        this.ctx.fill();
        this.ctx.closePath();
    }

    static  quantityCheckCircle(circle:Circle[])
    {
      if (circle.length > 15)
      {
        circle.shift();
      }
    }
    // Method to update circle position and velocity
    public update(canvas: HTMLCanvasElement, deltaTime : number) {
      
      //for drop down
      this.speed += this.gravity * (deltaTime / 1000);  //for acceleration
      this.y += this.speed;

      // Bounce upon hitting the bottom of the canvas
      if (this.y + this.radius > canvas.height)
      {
        this.y = canvas.height - this.radius;
        this.speed *= -this.dampeningFactor;          // Apply dampening effect
      }

  
      this.draw();
    }
    
  }

//import confetti from 'canvas-confetti';
// confetti.create(document.getElementById('canvas') as HTMLCanvasElement, {
// resize: true,
// useWorker: true,
// })({ particleCount: 200, spread: 200 });


//   confetti.create(ctx.canvas, {
//     resize: true,
//     useWorker: true,
//   })({ particleCount: 200, spread: 50 });