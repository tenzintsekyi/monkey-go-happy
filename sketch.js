var monkey;

var obstacle;

var obstacleGroup;

var backGround;

var score=0;

var bananaImage;

var groundImage;

var rand=-1;

var PLAY=1;
var END=0;
var gameState=PLAY;





function preload(){
  monkeyImage=loadAnimation(
    "Monkey_01.png",
"Monkey_02.png",
"Monkey_03.png",
"Monkey_04.png",
"Monkey_05.png",
"Monkey_06.png",
"Monkey_07png",
"Monkey_08.png",
);
  
  backGroundImage=loadImage(jungle.jpg);
  
  obstacleImage=loadImage(stone.png);
  
  bananaImage=loadImage(banana.png);

}

function setup() {
  createCanvas(400, 400);
  
  monkey=createSprite(20,370,10,10);
  
  obstacleGroup=createGroupSprite();
  
  monkey.addAnimation(monkeyImage);
  
  obstacleGroup.setAnimation(stone.png);
  
  background=createSprite();
  
  var ground = createSprite(99,370,400,20);
ground.x = ground.width /2;
  ground.visible=false;
  
  
}


function draw() {
  background(220);
  
  stroke("black");
  textSize(20);
  fill("black");
  score=Math.ceil(World.frameCount/60);
  text("score:"+score,100,50);
  
  if(gameState===PLAY){
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if (background.x < 0){
      background.x = background.width/2;
    }
  
  if(keyDown("space") && monkey.y >= 300){
      monkey.velocityY = -12 ;
  }
  
  if(monkey.isTouching(obstacle)){
    monkey.scale=-1;
  }
  
  if(monkey.isTouching(banana)){
    monkey.scale=+1;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
    
    monkey.collide(ground);
    
     //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    BananaGroup.setLifetimeEach(-1);
  
  
    
  }
  
  
  
  
  if(gameState===END){
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    spawnObstacles.setVelocityXEach(0);
    spawnBanana.setVelocityXEach(0);
    
    //change the trex animation
    monkey.setImage("monkey");
    
    
  }
  

  
  //banana group
    spawnBanana();
  
    //obstacles group
    spawnObstacle();
  drawSprite ();
}

function spawnBanana(){
  if (World.frameCount % 200 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = randomNumber(180,250);
    banana.setAnimation("bananaImage");
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
   BananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if(World.frameCount % 300 === 0) {
    var stone = createSprite(400,350,10,40);
    //stone.velocityX = - (6 + 3*count/100);

   stone.setAnimation("Stone");
   stone.velocityX=-4;
   
    
    //assign scale and lifetime to the obstacle           
   stone.scale = 0.2;
    stone.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(stone);
  }
}


