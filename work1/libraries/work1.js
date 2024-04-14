function setup() {
  createCanvas(600, 600);
  }
  
  
  function draw() {
  //face
  fill(255,203,164);
  background(204);
  ellipse(300,300,300,300);
  
  //hair
  fill(0,0,0);
  arc(300, 251, 300, 200, PI, TWO_PI) 

  //eyebrow
  fill(102,51,0);
  rect(140,200,100,25);
  
  //mouth
  fill(255,0,0)
  rect(250,350,100,50);
  
  //saliva
  fill(0,204,0);
  rect(325,380,25,600);
  fill(0,255,255);
  rect(300,380,25,600);
  fill(255,255,0);
  rect(275,380,25,600);
  fill(255,0,0);
  rect(250,380,25,600)

  //ear
  fill(255,203,164);
  arc(160,300,80,80, HALF_PI, PI+HALF_PI);
  arc(440,300,80,80, PI+HALF_PI, HALF_PI);

  //right eyebrow
  fill(102,51,0);
  rect(350,250,100,25);
  
  //eye
  fill(255,255,255)//outside
  ellipse(200,250,45,45);
  ellipse(400,300,45,45);
  fill(0,0,0)//inside
  ellipse(200,250,25,25);
  ellipse(400,300,25,25);

  //nose
  line(300,290,320,320);
  line(290,320,320,320)
  }
  