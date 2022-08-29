var START=2;
var PLAY = 1;
var END = 0;

var submarine;
var submarineImg;
var sea;
var invBg;
var gameState = 2;
var obstacleGroup;
var start,startImg;
var play, playImg;
var gameOver, gameOverImg;

var theme;

var sonar;

var burn;

var dolp, fish;

var diverImg, whaleImg;
var score=0;

var wall, wall1, wall2;

var obGroup;


function preload() {
  submarineImg = loadImage("images/sub.png")
  seaImg = loadImage("images/bg.png");
  diverImg = loadImage("images/obs2.png");
  whaleImg = loadImage("images/obs1.png");
  startImg = loadImage("images/1120358.jpg");
  playImg=loadImage("images/Play.png");
  gameOverImg=loadImage("images/over.png")
  sonar=loadSound("sounds/sonar.mp3");
  burn=loadImage("images/bn.png");
  //theme=loadSound("sounds/Theme.mp3");
  dolp=loadImage("images/dolph.png");
  fish=loadImage("images/fish.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sea = createSprite(500, windowHeight / 2, 10, 10);
  sea.addImage(seaImg);
  start=createSprite(windowWidth/2,windowHeight/1.9,20,20);
  start.addImage(startImg);


  gameOver = createSprite(windowWidth/2, windowHeight/2,10,10);
  gameOver.addImage(gameOverImg);
  
  play = createSprite(windowWidth/2, windowHeight/1.25, 20,20);
  play.addImage(playImg);
  play.scale=0.5;

  submarine = createSprite(windowWidth / 6, windowHeight / 2, 5, 5);
  submarine.addImage(submarineImg);
  
  submarine.scale = 1.5;


  wall = createSprite(-150,height/2,10,height)
  wall1 = createSprite(windowWidth/2,0,windowWidth,10)
  wall1.visible=false;
  wall2 = createSprite(windowWidth/2,windowHeight,windowWidth,10)
  wall2.visible=false;

  obstacleGroup = new Group();
  
  obGroup=new Group();

  submarine.setCollider("rectangle",0,30,275,45)
  submarine.debug=false;
}

function draw() {
    
   if (gameState ===START){
        start.visible=true;
        play.visible=true;
        submarine.visible=false;
        sea.visible=false;
        gameOver.visible=false;
        submarine.y=windowHeight/2;
        //theme.play();
        if(mousePressedOver(play)){
          gameState=PLAY; 
        }
   }


   if (gameState === PLAY) {
    //theme.stop();
    start.visible=false;
     play.visible=false;
     submarine.visible=true;
        sea.visible=true;
        submarine.addImage(submarineImg);
  
  submarine.scale = 1.5;
        
  sea.velocityX = -20;

    if (sea.x < 0) {

      sea.x = sea.width / 2;
    }


    if (keyWentDown("up")) {
      submarine.velocityY = -10;
    }
    if (keyWentUp("up")) {
      submarine.velocityY = 0;

    }
    if (keyWentUp("down")) {
      submarine.velocityY = 0;
    }
    if (keyWentDown("down")) {
      submarine.velocityY = 10;
    }
    obstacles();
    nom();

    
   
    /*for(var i=0; i<obstacleGroup.length; i++){
   
      if(obstacleGroup.get(i).x<38 && obstacleGroup.get(i).x>28){    
        console.log("hello");
        sonar.play();
      }
      else{
        sonar.stop();
      }
    }*/
    

    obstacleGroup.overlap(wall,increaseScore)
    obGroup.overlap(wall,increaseScore)



    if(submarine.isTouching(obstacleGroup)){
      gameState=END; 
      submarine.addImage(burn);
      submarine.scale=0.5;
    }

    if(submarine.isTouching(obGroup)){
      gameState=END; 
      submarine.addImage(burn);
      submarine.scale=0.5;
    }

    if(submarine.isTouching(wall1)){
      gameState=END; 
      submarine.addImage(burn);
      submarine.scale=0.5;
    }
    
    if(submarine.isTouching(wall2)){
      gameState=END; 
      submarine.addImage(burn);
      submarine.scale=0.5;
    }
  
  }


     if(gameState===END){
      sea.velocityX=0;
      obstacleGroup.destroyEach();
      obGroup.destroyEach();
      gameOver.visible=true;
      submarine.velocityY=0;
      if(mousePressedOver(gameOver)){
        reset();
      }

    }
  drawSprites();
  fill("white");
  textSize(20);
  text("Score= "+score,30,20); 


}

function increaseScore(obs){
  score=score+10
  obs.remove()
}

function obstacles() {
  
  if (World.frameCount % 25 === 0) {
    var obstacle = createSprite(width, 200, 20, 20);
    obstacle.y = Math.round(random(100, 900));
    //create switch statement
    rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obstacle.addImage(whaleImg);
      obstacle.setCollider("rectangle",0,0,650,200)
        break;
      case 2: obstacle.addImage(diverImg);
        break;
      default: break;


    }

    obstacle.velocityX = -(25+(score/2));
    obstacle.scale = 0.5;
    obstacle.depth = submarine.depth + 1;
    obstacleGroup.add(obstacle);
    obstacle.debug=false;
  }
}

function reset(){
  gameState=START;
  score=0;

}

function nom() {
  
  if (World.frameCount % 30 === 0) {
    var ob = createSprite(width, 200, 20, 20);
    ob.y = Math.round(random(80, 600));
    //create switch statement
    rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: ob.addImage(dolp);
      ob.setCollider("rectangle",0,0,650,200)
        break;
      case 2: ob.addImage(fish);
        break;
      default: break;


    }

    ob.velocityX = -(30+(score/2));
    ob.scale = 0.5;
    ob.depth = submarine.depth + 1;
    obGroup.add(ob);
    ob.debug=false;
  }
}
