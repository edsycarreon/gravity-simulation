import { randomColor, randomIntFromRange } from "./utils";

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const gravity = 0.1;
const friction = 0.99;
const quantity = randomIntFromRange(100, 500);
const ballRadius = {
  min: 10,
  max: 20,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

addEventListener("click", () => {
  init();
});

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }

    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius <= 0
    ) {
      this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

// Implementation
let ballArray;
function init() {
  ballArray = [];
  for (let i = 0; i < quantity; i++) {
    let radius = randomIntFromRange(ballRadius.min, ballRadius.max);
    let x = randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(0, canvas.height - radius);
    let dx = randomIntFromRange(-2, 2);
    let dy = randomIntFromRange(-2, 2);
    let color = randomColor(colors);

    ballArray.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, canvas.width, canvas.height);
  for (const ball of ballArray) {
    ball.update();
  }
}

init();
animate();
