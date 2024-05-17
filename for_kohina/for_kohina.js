let ball;
let speed;
let angle;
let score = 0;
let health; // health
let normalMode = false; // Flag for normal mode
let customMode = false; // Flag for custom mode
let normalButton; // Button object for normal mode
let customButton; // Button object for custom mode
let sizeInput; // Input object for size
let speedInput; // Input object for speed
let healthInput; // Input object for health
let applyButton; // Button object to apply custom settings
let resetButton; // Button object to reset ball parameters

function setup() {
  createCanvas(1000, 600);
  resetBall();
  
  // Create normal mode button
  normalButton = createButton('Difficult Mode');
  normalButton.position(10, height - 80);
  normalButton.mousePressed(toggleNormalMode);
  
  // Create custom mode button
  customButton = createButton('Custom Mode');
  customButton.position(10, height - 50);
  customButton.mousePressed(toggleCustomMode);
  
  // Create inputs for custom settings (initially hidden)
  sizeInput = createInput();
  sizeInput.position(10, height / 2 - 50);
  sizeInput.attribute('placeholder', 'Ball Size');
  speedInput = createInput();
  speedInput.position(10, height / 2 - 20);
  speedInput.attribute('placeholder', 'Speed');
  healthInput = createInput();
  healthInput.position(10, height / 2 + 10);
  healthInput.attribute('placeholder', 'Health');
  applyButton = createButton('Apply');
  applyButton.position(150, height / 2 + 10);
  applyButton.mousePressed(applyCustomSettings);
  
  // Create reset button
  resetButton = createButton('Reset');
  resetButton.position(10, height / 2 + 40); // Adjust the position of the reset button
  resetButton.mousePressed(resetBallParameters);
  hideCustomSettings(); // Initially hide custom settings

  // Create reset score button
  resetScoreButton = createButton('Reset Score');
  resetScoreButton.position(10, height / 2 + 70); // Adjust the position of the reset score button
  resetScoreButton.mousePressed(resetScore);
  hideCustomSettings(); // Initially hide custom settings
}


// Fix a bug (plz don't care about this)
normalMode = true;

// About resetscore
function resetScore() {
  score = 0;
}

function draw() {
  background(220);
  
  // Update the position of the ball
  if (normalMode) {
    // Normal mode: horizontal movement without bouncing
    ball.x += speed * cos(angle);
    if (ball.x < 0) ball.x = width;
    else if (ball.x > width) ball.x = 0;
  } else {
    // Default mode: bouncing off the edges
    ball.x += speed * cos(angle);
    ball.y += speed * sin(angle);
    // Boundary check
    if (ball.x < 0 || ball.x > width) {
      angle = PI - angle; // Horizontal rebound
    }
    if (ball.y < 0 || ball.y > height) {
      angle = -angle; // Vertical rebound
    }
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

function resetBallParameters() {
  // Reset ball parameters to random values
  resetBall();
  
  // Reset custom mode flag if in custom mode
  if (customMode) {
    customMode = false;
    customButton.style('background-color', ''); // Reset button color
    hideCustomSettings(); // Hide custom settings if they are currently visible
  }
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

  // Check if custom mode is enabled and apply custom settings
  if (customMode) {
    let customSize = parseInt(localStorage.getItem('customSize'));
    let customSpeed = parseFloat(localStorage.getItem('customSpeed'));
    let customHealth = parseInt(localStorage.getItem('customHealth'));

    if (!isNaN(customSize)) {
      ball.size = customSize;
    }
    if (!isNaN(customSpeed)) {
      speed = customSpeed;
    }
    if (!isNaN(customHealth)) {
      health = customHealth;
    }
  }
}

function toggleNormalMode() {
  // Toggle normal mode
  normalMode = !normalMode;
  // Update button label based on mode
  if (normalMode) {
    normalButton.html('Difficult Mode');
  } else {
    normalButton.html('Normal Mode');
  }
}

function toggleCustomMode() {
   // Toggle custom mode
  customMode = !customMode;
  // Show/hide custom settings
  if (customMode) {
    customButton.style('background-color', 'green'); // Change button color to green
    showCustomSettings();
  } else {
    customButton.style('background-color', ''); // Reset button color
    hideCustomSettings();
  }
}

function showCustomSettings() {
  sizeInput.show();
  speedInput.show();
  healthInput.show();
  applyButton.show();
}

function hideCustomSettings() {
  sizeInput.hide();
  speedInput.hide();
  healthInput.hide();
  applyButton.hide();
}

function applyCustomSettings() {
  // Apply custom settings
  let customSize = parseInt(sizeInput.value());
  let customSpeed = parseFloat(speedInput.value());
  let customHealth = parseInt(healthInput.value());
  
  if (!isNaN(customSize)) {
    ball.size = customSize;
    localStorage.setItem('customSize', customSize);
  } else {
    size = round(random(20, 50));
  }
  
  if (!isNaN(customSpeed)) {
    speed = customSpeed;
    localStorage.setItem('customSpeed', customSpeed);
  } else {
    speed = random(1, 10);
  }
  
  if (!isNaN(customHealth)) {
    health = customHealth;
    localStorage.setItem('customHealth', customHealth);
  } else {
    health = round(random(25, 1000));
  }
}