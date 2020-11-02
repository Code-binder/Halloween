var girl, girl_running, girl_collided;
var ground, invisibleGround, groundImage;
var cloud, icloud;
var obstacle5,obstacle6;
var obstacleGroup,cloudsGroup;
var PLAY=1; //constants
var END=0;
var gameState=PLAY;
var gameOver,igameOver
var restart,irestart;
var jumpSound,dieSound,checkpSound;
var dieSound;
var bg,bgi;



var score=0;


function preload(){
  girl_running = loadAnimation("girlRunning.png","girlRunning2.png","girlRunning3.png");
  girl_collided = loadAnimation("girlCollided.png");
  
  
  icloud = loadImage("cloud.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png")
  igameOver = loadImage("gameOver.png");
  irestart = loadImage("restart.png");
  bgi = loadImage("hbg.jpg")
  
  jumpSound = loadSound("jump.mp3");
  dieSound= loadSound("dieSound.mp3");
  checkpSound = loadSound("checkPoint.mp3");
  
  
}

function setup() {
  background(220);
  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(width/2,height/2);
  bg.addImage("hbg",bgi);
  bg.velocityX=-3;
  
  
  //create a girl sprite
  girl = createSprite(50,height-50,20,50);
  girl.addAnimation("running", girl_running);
  girl.addAnimation("collided", girl_collided);
  girl.scale = 0.6;
  girl.setCollider("rectangle",0,0,80,140);
  //girl.debug=true;
  //create a ground sprite
  
  
  
  //creating invisible ground
  invisibleGround = createSprite(200,height-10,400,10);
  invisibleGround.visible = false;
  
  //generate random numbers
  var rand =  Math.round(random(1,100))
  console.log(rand)

  obstacleGroup = new Group();
  cloudsGroup = createGroup();
  
   gameOver = createSprite(width/2,height/2-70);
        gameOver.addImage("gameOver.png",igameOver);
        gameOver.scale=0.3;
        gameOver.visible=false;
        
        restart = createSprite(width/2,height/2);
        restart.addImage("restart.png",irestart);
        restart.scale = 0.4;
        restart.visible=false;
}

function draw() {
  //set background color
  background("black");
  
  
  
  
  if(gameState===PLAY)
  {
        if(obstacleGroup.isTouching(girl))
        {
          gameState=END;
          dieSound.play();
          
        }
    bg.velocityX = -(4+3*(score/500));
    
        score=score+Math.round(getFrameRate()/30);
            // jump when the space key is pressed
        if((keyDown("space")||touches.length>0) && girl.y >= height-80) {
          girl.velocityY = -20;
          jumpSound.play();
        }
          girl.velocityY = girl.velocityY + 0.8

       
     
        if(score>0 && score%500===0){
          checkpSound.play();
        }
        if (bg.x < 0){
          bg.x = bg.width/2;
        }
        
        
        spawnObstacle();
  }
  else if(gameState===END)
  {
        
        cloudsGroup.setVelocityXEach(0);
        cloudsGroup.setLifetimeEach(-1);
        obstacleGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
    
        girl.changeAnimation("collided",girl_collided);
        girl.velocityY=0;
    
        restart.visible=true;
        gameOver.visible=true;
    
        bg.velocityX=0;
        
    
        if(mousePressedOver(restart)||touches.length>0){
          gameState = PLAY;
          obstacleGroup.destroyEach();
          cloudsGroup.destroyEach();
          girl.changeAnimation("running", girl_running);
          gameOver.visible=false;
          restart.visible=false;
          score=0;
          touches=[];
          
        }
        
  }

  
  
  
  
  
  //stop man from falling down
  girl.collide(invisibleGround);
 
  
  drawSprites();
  stroke("darkgreen");
  strokeWeight(1);
  textSize(30);
  fill("#006400")
  text("score:"+score,40,50);
  
}



  
  
  

function spawnObstacle(){
  if(frameCount%70===0){
    obstacle = createSprite(width,height-40,12,40);
    obstacle.velocityX=-(4+score/500);
    obstacle.scale=0.2;
   // obstacle.debug=true;
   


    var rando = Math.round(random(5,6));
    switch(rando){
        case 5:obstacle.addImage(obstacle5);
        break;
        case 6:obstacle.addImage(obstacle6);
        break;
        
        
         }
    obstacle.lifetime = windowWidth;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle",18,20);
  }
}


