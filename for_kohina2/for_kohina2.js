let img; // 图片
let img1; // 图片
let speed;
let angle;
let score = 0;
let health; // health
let startTime;
let elapsedTime = 0;
let gameOver = false;

function preload() {
  // 加载图片
  img = loadImage('khn1.png');
  img1 = loadImage('hand2.png');
  background = loadImage('R.jpg')
}

function setup() {
  createCanvas(1000, 600);
  resetGame();
}

function draw() {
    image(background, 0, 0, width, height);

  if (!gameOver) {
    // 更新球的位置
    ball.x += speed * cos(angle);
    ball.y += speed * sin(angle);
    
    // 边界
    if (ball.x < 0 || ball.x > width) {
      angle = PI - angle; // 水平反弹
    }
    if (ball.y < 0 || ball.y > height) {
      angle = -angle; // 垂直反弹
    }
    
    // 检查鼠标是否悬停在球上
    let d = dist(mouseX, mouseY, ball.x, ball.y);
    if (d < ball.size / 2) {
      // 随机减少血量
      let damage = round(random(1, 5));
      health -= damage;
    }
    
    // 显示血量
    fill(255, 0, 0);
    textSize(24);
    text("Durability level: " + health, 10, 30);
    
    // 球的图片
    image(img, ball.x - ball.size / 2, ball.y - ball.size / 2, ball.size, ball.size);
    image(img1, mouseX-87, mouseY-90, 100, 100);
    
    // 如果血量为0，重置小球和血量
    if (health <= 0) {
      resetBall();
      score++; // 增加分数
    }
    
    // 显示分数
    fill(255,255,255);
    textSize(24);
    text("Kohina: " + score, 10, 60);
    
    // 显示剩余时间
    let remainingTime = max(60 - floor((elapsedTime / 1000)), 0);
    fill(255,255,255)
    textSize(24);
    text("Time: " + remainingTime + " seconds", width - 200, 30);
    
    // 更新时间
    elapsedTime = millis() - startTime;
    if (elapsedTime >= 60000) {
      gameOver = true;
    }
  } else {
    // 游戏结束，显示分数和重新开始提示
    textSize(36);
    fill(255,255,255)
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2 - 50);
    text("You Caught Kohina: " + score, width / 2, height / 2);
    text("Press 'R' to restart", width / 2, height / 2 + 50);
  }
}

function resetGame() {
  score = 0;
  resetBall();
  startTime = millis();
  elapsedTime = 0;
  gameOver = false;
}

function resetBall() {
  // 重新设置球的位置 速度和大小
  ball = {
    x: random(width),
    y: random(height),
    size: round(random(50, 250)) // 随机大小
  };
  speed = random(1, 25); // 随机速度
  angle = random(TWO_PI); // 随机角度
  health = round(random(50, 1000)); // 随机血量
}

function keyPressed() {
    if (gameOver && key.toLowerCase() === 'r') {
      resetGame();
    }
}