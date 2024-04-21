var img;
var initials ='jm'; // your initials
var choice = '1'; // starting choice, so it is not empty
var screenbg = 250; // off white background
var lastscreenshot=61; // last screenshot never taken

function preload() {
// preload() runs once, it may make you wait
//  img = loadImage('cat.jpg');  // cat.jpg needs to be next to this .js file
// you can link to an image on your github account
  bg = loadImage('pokertable.jpg');
  img = loadImage('chips1.png');
  img1 = loadImage('chips2.png');
  img2 = loadImage('chips3.png');
  img3 = loadImage('pokerA.png');
  img4 = loadImage('pokerJ.png');
  img5 = loadImage('pokerQ.png');
  img6 = loadImage('pokerK.png');
  img7 = loadImage('pokerbackside.png');
  img8 = loadImage('pokerA1.png');
  img9 = loadImage('pokerA2.png')
}

function setup() {
createCanvas(800, 400);  // canvas size
background(bg);
}

function draw() {
  if (keyIsPressed) {
    choice = key; // set choice to the key that was pressed
    clear_print(); // check to see if it is clear screen or save image
  }
  if (mouseIsPressed){
    newkeyChoice(choice);  // if the mouse is pressed call newkeyChoice
  }
}

function newkeyChoice(toolChoice) { //toolchoice is the key that was pressed
  // the key mapping if statements that you can change to do anything you want.
  // just make sure each key option has the a stroke or fill and then what type of 
  // graphic function

  if (toolChoice == '1' ) {  // 1$ chips
    image(img, mouseX-123, mouseY-40, 200, 200);

  } else if (toolChoice == '2') { // 2$ chips
    image(img1, mouseX-70, mouseY-100, 200, 200);

  }else if (toolChoice == '3') { // 100$ chips 
    image(img2, mouseX-175, mouseY-100, 200, 200);

  } else if (toolChoice == '4') { // create square
    stroke(255,255,255);
    noFill();
    rect(mouseX-40, mouseY-50, 75, 100);

  } else if (key == '5') { // this tool calls a function
    image(img3, mouseX-45, mouseY-350, 900, 500)
  
  } else if (toolChoice == '6') { // Poker J
    image(img4, mouseX-30, mouseY-45)

  } else if (toolChoice == '7') { // Poker Q
    image(img5, mouseX-30, mouseY-45)

  } else if (toolChoice == '8') { // Poker K
    image(img6, mouseX-30, mouseY-45)

  } else if (toolChoice == '9') { // Poker A 1
    image(img8, mouseX-30, mouseY-45)

  } else if (toolChoice == '0') { // POker A 2
    image(img9, mouseX-30, mouseY-45)

  } else if (toolChoice == 'g' || toolChoice == 'G') { // Poker backside
    image(img7, mouseX-35, mouseY-50, 70, 95);
    
  }
 }
 
function testbox(r, g, b) {
// this is a test function that will show you how you can put your own functions into the sketch
  x = mouseX;
  y = mouseY;
  fill(r, g, b);
  rect(x-50, y-50, 100, 100);

}

function clear_print() {
// this will do one of two things, x clears the screen by resetting the background
// p calls the routine saveme, which saves a copy of the screen
  if (key == 'x' || key == 'X') {
    background(bg); // set the screen back to the background color
  } else if (key == 'p' || key == 'P') {
     saveme();  // call saveme which saves an image of the screen
  }
}

function saveme(){
    //this will save the name as the intials, date, time and a millis counting number.
    // it will always be larger in value then the last one.
  filename=initials+day() + hour() + minute() +second();
  if (second()!=lastscreenshot) { // don't take a screenshot if you just took one
    saveCanvas(filename, 'jpg');
    key="";
  }
  lastscreenshot=second(); // set this to the current second so no more than one per second
  
}
