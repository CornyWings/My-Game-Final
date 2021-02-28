var bowserImg, goombaImg, koopaTroopaImg, piranhaPlantImg;
var marioImg, peachImg, mario, newMario = "not created";
var bowserBackground;
var enemyGroup;
var mushroom;
var lives;
var count = 0;
var d;

lives= 5;

var gameState = "play";


function preload()
{
  bowserImg= loadImage("Bowser.jpg");
  goombaImg= loadImage("Goomba.png");
  koopaTroopaImg= loadImage("KoopaTroopa.png");
  marioImg= loadAnimation("Mario1.png", "Mario2.png", "Mario3.png");
  peachImg= loadImage("Peach.png");
  bowserBackgroundImg= loadImage("bowserBackgroundnew.jpg");
  piranhaPlantImg= loadImage("Piranhaplant.png");
  mushroom= loadImage("Mushroom.png");

}



function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(height);

  bowserBackground= createSprite( width/2, height/2, width, height);
  bowserBackground.addImage("bowserBackgroundImg", bowserBackgroundImg);
  bowserBackground.x= bowserBackground.width/2+350;
  bowserBackground.scale= 2;

  mario= createSprite(250,650,50,50);
  mario.addAnimation("marioAnimation", marioImg);

  invisibleGround= createSprite(600,650,1200,10);
  invisibleGround.visible= false;

  enemyGroup = new Group();

  mario.debug=true;

  bowserBackground.velocityX= -3;  

  mario.setCollider("rectangle", 30, 0, 110, 180)

 
}


function draw() {
  background(0);  

if(gameState== "play"){



  if(bowserBackground.x<0){

    bowserBackground.x= bowserBackground.width/2+350;
  }




  if(keyDown( UP_ARROW)){
    mario.velocityY= -20;

  }
  mario.velocityY=mario.velocityY + 0.8;

  mario.collide(invisibleGround);
  //console.log(mario.y);
  if(mario.y>=550 && mario.isTouching(enemyGroup)){
    mario.destroy();
    lives--;
    newMario= "not created";
    d = World.seconds;
    console.log(World.seconds);
    

    if(lives== 0){
      gameState= "end";
      
    }

  
      
    
    
  }
  else{
    for (var i=0; i<enemyGroup.length; i++){
     
      if(enemyGroup.get(i).x>=mario.x-10 && enemyGroup.get(i).x<= mario.x+10 && mario.y<550 && mario.y>403){
        enemyGroup.get(i).destroy();
        //break;
      }
    }
  }



count = count+Math.round(World.frameRate/60);
  
  randEnemy();

  if(World.seconds== d+3){
    if(newMario != "created"){

    
    newMario= "created";
    mario= createSprite(250,650,50,50);
    mario.addAnimation("marioAnimation", marioImg);
    mario.setCollider("rectangle", 30, 0, 110, 180)
    console.log(lives);
    console.log(World.seconds);
    }
    
  }
}
if(gameState== "end"){


  textFont("comicSansMS");
  textSize(30);
  text("Game Over!", width/2, height/2);


}
  drawSprites();

  textSize(18);
  textFont("Verdana");
  textStyle(BOLD);
    
  text("Score: "+ count, width-150, 100);

  for(i=0; i<lives; i++){
    image(mushroom, 50+50*i,50, 50,50);
  }
}




function randEnemy(){
  if( frameCount % 200==0){
    var enemy= createSprite(1000,550, 10,10);
    enemy.debug=true;
    enemy.velocityX= -4;
     var rand= Math.round(random(1,3));
     switch(rand){
       case 1: enemy.addImage(goombaImg);
       enemy.scale= 0.3;
       break;
       case 2: enemy.addImage(koopaTroopaImg);
       enemy.scale= 0.5;
       enemy.setCollider("rectangle",0 ,0, 150, 240)
       break;
       case 3: enemy.addImage(piranhaPlantImg);
       enemy.scale= 0.3;
       enemy.setCollider("rectangle",0,0, 350, 480);
       break;
       default:
       break;
     }

      enemyGroup.add(enemy);

     enemy.lifetime= 600;

  }

}