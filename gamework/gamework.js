var ballx = 300;
var bally = 300;
var ballSize = 40;
var score = 0;
var gameTime = 30; // time S
var startTime; // start Time
var gameStarted = false; // gameon or not

function setup() {
  createCanvas(1000, 600);
  textAlign(CENTER);
  textSize(20);
}

function preload() {
  gun = loadImage('gun.png');
  gunsound = loadSound("gunsound.mp3");
}

function draw() {
  background(220);
  
  if (!gameStarted) {
    // startscreen
    text("Click to Start", width / 2, height / 2);
  } else {
    // gameon
    gameOn();
    text("Score: " + score, width - 900, 40);
    
    // calculate remaining time
    var elapsedTime = (millis() - startTime) / 1000; // milliseconds to seconds
    var remainingTime = gameTime - elapsedTime;
    text("Time: " + nf(remainingTime, 0, 1) + "s", width - 900, 70);
    
    // game end when the time is over
    if (remainingTime <= 0) {
      gameOver();
    }
  }
}

function gameOn() {
  image(gun, mouseX - 30, mouseY - 90, 800, 500);
  var distToBall = dist(ballx, bally, mouseX, mouseY);
  if (distToBall < ballSize / 2 && mouseIsPressed) {
    ballx = random(width);
    bally = random(height);
    score = score + 1;
  }
  ellipse(ballx, bally, ballSize, ballSize);
}

function gameOver() {
  // game over
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2);
  text("press R to restart", 500, 350)
  noLoop(); // stop record
}

function mousePressed() {
  if (!gameStarted) {
    // start game
    gameStarted = true;
    startTime = millis(); // record time
  } else {
    // gun sound
    gunsound.play();
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    resetGame();
  }
}

function resetGame() {
  // rest game
  score = 0;
  startTime = millis();
  gameStarted = true;
  loop(); // restar record
}
