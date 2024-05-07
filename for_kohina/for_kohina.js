let ball;
let speed;
let angle;
let score = 0;
let health; // health

function setup() {
  createCanvas(1000, 600);
  resetBall();
}

function draw() {
  background(220);
  
  // Update the position of the ball
  ball.x += speed * cos(angle);
  ball.y += speed * sin(angle);
  
  // Boundary check
  if (ball.x < 0 || ball.x > width) {
    angle = PI - angle; // Horizontal rebound
  }
  if (ball.y < 0 || ball.y > height) {
    angle = -angle; // Vertical rebound
  }
  
  // Check that the mouse is hovering over the ball
  let d = dist(mouseX, mouseY, ball.x, ball.y);
  if (d < ball.size / 2) {
    // Randomly reduce blood volume
    let damage = round(random(1, 5));
    health -= damage;
  }
  
  // Display blood volume
  fill(255, 0, 0);
  textSize(24);
  text("Health: " + health, 10, 30);
  
  // Make a ball
  fill(255, 0, 0);
  ellipse(ball.x, ball.y, ball.size);
  
  // If HP is 0, reset the pellet and HP
  if (health <= 0) {
    resetBall();
    score++; // Increase the score
  }
  
  // Display score
  fill(0);
  textSize(24);
  text("Score: " + score, 10, 60);
}

function resetBall() {
  // Reset the position, speed, and size of the ball
  ball = {
    x: random(width),
    y: random(height),
    size: round(random(20, 50)) // Random size
  };
  speed = random(1, 10); // Random velocity
  angle = random(TWO_PI); // Random Angle
  health = round(random(25, 1000)); // Random blood volume
}
