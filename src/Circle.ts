// Circle class to represent each circle object
export default class Circle {
  
  constructor(
      public x: number,
      public y: number,
      public radius: number,
      public speed: number = 0,
      public number:string,
      private ctx: CanvasRenderingContext2D                     // Accept ctx as a parameter
      ) {
      }

  //properties
  gravity:number = 9.8;                                         // Earth-like gravity  F = mg    m/vˆ2
  dampeningFactor:number = 0.8;                                 // Dampening effect on bounce
  startTimeToDelete:number = 0;
  colors = ['red','green','blue','yellow','orange','purple','cyan',
    'magenta','pink','teal','lime','skyblue','violet','salmon','navy'
  ];



  public draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);// with radian PI
      this.ctx.fillStyle = this.colors[parseInt(this.number)];                              // Circle color
      this.ctx.fill();
      this.ctx.closePath();

       // Set text properties
      this.ctx.fillStyle = 'white'; // Color of the text inside the circle
      this.ctx.font = `${this.radius}px Arial`; // Font size and type

      // Center the text horizontally and vertically in the circle
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';

      // Write number at the center of the circle
      this.ctx.fillText(this.number, this.x, this.y); // Replace '42' with your desired number
  }


//---------------------------------------------------------- section  delete for array
  //no more than 15 circles on the screen
  static  quantityCheckCircle(circles:Circle[])
  {
    // console.log(circles.length);
    if (circles.length >= 15)
    {
      circles.shift();
    }
  }


  //delete on array
  static  ifTwoSecondsAboveTheFloor(circles:Circle[])
  {
    circles.forEach((circle, index)=>{
        if (circle.waitForTwoSecond())
          circles.splice(circles.findIndex((c)=>circle),1);
      })
  }

  //when the circle on the floor waits 2 seconds to be removed
  public  waitForTwoSecond()
  {
    if (!this.startTimeToDelete && 
      this.speed < 0 && this.speed > -0.2 &&
        (this.y + this.radius >= this.ctx.canvas.height))     //check circle on the floor
    {
      this.startTimeToDelete = new Date().getSeconds();
    }
    if (this.startTimeToDelete)
    {
      let currentTime:number = new Date().getSeconds();

      if ((currentTime - this.startTimeToDelete) > 2)         //need to delete
      {
        return true
      }
    }
    return false;
  }




//-----------------------------------------------------------       section for update
  // Method to update circle position and velocity
  public update(canvas: HTMLCanvasElement, deltaTime : number) {
 
    //for drop down
    this.speed += this.gravity * (deltaTime / 1000);              //for acceleration //physics this.speed === v
    this.y += this.speed;

    // Bounce upon hitting the bottom of the canvas
    if (this.y + this.radius > canvas.height)
    {
      this.y = canvas.height - this.radius;
      this.speed *= -this.dampeningFactor;                        // Apply dampening effect
    }
    if (this.y - this.radius < 0)
      this.y = this.radius;
    if (this.x + this.radius >= canvas.width)
      this.x = canvas.width - this.radius;
    if (this.x - this.radius < 0)
      this.x = this.radius;
    console.log("X = " + this.x + "   Y = " + this.y);
    this.draw();
  }
  
}