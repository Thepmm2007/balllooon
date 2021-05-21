var balloon, balloonS;
var BalloonImg1;
var database;
var backgroundImg;
var position1;
function preload(){
  balloon = loadAnimation("../images/balloon1.png","../images/balloon2.png","../images/balloon3.png");
  BalloonImg1 = loadImage("../images/balloon1.png");
  backgroundImg = loadImage("../images/background.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200,600);
  balloonS = createSprite(400, 200, 150, 150);
  balloonS.addImage("Bal",BalloonImg1)
  balloonS.scale = 0.6;
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(backgroundImg);
  if(keyDown(LEFT_ARROW) ){
    updatePosition(-10,0)
    balloonS.addAnimation("aa",balloon)
  }
   else if(keyDown(RIGHT_ARROW) ){
    updatePosition(10,0)
    balloonS.addAnimation("aa",balloon)
  }
  else if(keyDown(UP_ARROW) ){
    updatePosition(0,-10)
    balloonS.addAnimation("aa",balloon)
    balloonS.scale -= 0.05;
  }
  else if(keyDown(DOWN_ARROW) ){
    updatePosition(0,10)
    balloonS.addAnimation("aa",balloon)
    balloonS.scale += 0.05;
  }
  drawSprites();
}

function readPosition(data){
  position1 = data.val();
  balloonS.x = position1.x;
  balloonS.y = position1.y
}

function showError(){
  console.log("error in reading from database ")
}

function updatePosition(x,y){
  database.ref('balloon/position').set({
    'x' : position1.x + x, 
    'y' : position1.y + y
  })
}