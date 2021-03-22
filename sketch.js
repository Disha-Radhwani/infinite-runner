var backImage,backgr;
var player, player_running;
var ground,ground_img;
var book,boo_img
var monst,monst_image;
var bookgroup;
var monstgroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0


function preload(){
  backImage=loadImage("sprites/classroom.jpg");
  player_running = loadAnimation("sprites/1.png","sprites/2.png","sprites/3.png","sprites/4.png");
 boo_img=loadImage("sprites/book.png")
monst_image=loadImage("sprites/monster.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,150,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.5;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
bookgroup = new Group();
monstgroup = new Group();

}

function draw() { 
  background(0);

  
   
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    spawnbook();
    spawnmonst();
    player.collide(ground);

  }  

if(player.isTouching(bookgroup)){
  bookgroup.destroyEach();
score +=  2;
player.scale += +0.05
}


if(player.isTouching(monstgroup)){
gameState = END;
}

else if(gameState === END){

  player.visible=false;
  backgr.velocityX=0;

  bookgroup.destroyEach();
  monstgroup.destroyEach();

  stroke(100);
  textSize(50)
fill(255)
text("GAME OVER",400,200)
}

  drawSprites();
  textSize(20)
  stroke(100)
  fill("#F7F7F7")
  text("SCORE:"+score,650,20)
 
}

function spawnbook(){
if(frameCount%80===0){

  book=createSprite(680,200,5,5)
  book.addImage(boo_img)
  book.y=random(120,200)
  book.scale=0.1
  book.velocityX=-5

  book.lifetime=150
  player.depth = book.depth +1 
 
  bookgroup.add(book);
}

}

function spawnmonst(){
if(frameCount%100===0){
monst=createSprite(800,340,20,20)
monst.addImage(monst_image)
monst.scale = 0.5;
monst.velocityX=-8

monst.lifetime=150;
monstgroup.add(monst);

}
}