// Circle class to represent each circle object
export default class Circle {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public dy: number = 0,
        private ctx: CanvasRenderingContext2D // Accept ctx as a parameter
        ) {}

    //properties
    gravity:number = 0.2; // Earth-like gravity
    dampeningFactor = 0.8; // Dampening effect on bounce



    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'blue'; // Circle color
        this.ctx.fill();
        this.ctx.closePath();
    }
  
    // Method to update circle position and velocity
    update(canvas: HTMLCanvasElement) {
      this.dy += this.gravity;
      this.y += this.dy;
  
      // Bounce upon hitting the bottom of the canvas
      if (this.y + this.radius > canvas.height) {
        this.y = canvas.height - this.radius;
        this.dy *= -this.dampeningFactor; // Apply dampening effect
      }
  
      this.draw();
    }
    
  }

  let x:number = 5;