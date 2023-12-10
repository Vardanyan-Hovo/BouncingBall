"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Circle {
    constructor(x, y, radius, dy = 0, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dy = dy;
        this.ctx = ctx;
        this.gravity = 0.2;
        this.dampeningFactor = 0.8;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
        this.ctx.closePath();
    }
    update(canvas) {
        this.dy += this.gravity;
        this.y += this.dy;
        if (this.y + this.radius > canvas.height) {
            this.y = canvas.height - this.radius;
            this.dy *= -this.dampeningFactor;
        }
        this.draw();
    }
}
exports.default = Circle;
let x = 5;
