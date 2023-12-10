"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = __importDefault(require("./Circle"));
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const circles = [];
let lastTime = 0;
function createCircle(x, y) {
    const radius = Math.random() * 30 + 10;
    const newCircle = new Circle_1.default(x, y, radius, 0, ctx);
    circles.push(newCircle);
}
canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    createCircle(mouseX, mouseY);
});
function tick(currentTime) {
    const deltaTime = currentTime - lastTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < circles.length; i++) {
        circles[i].update(canvas);
    }
    console.log(deltaTime);
    lastTime = currentTime;
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
