var ghost,bg,ghostimg,bgimg,climberImg,doorimg,i,gamestate= "play", igrp,dgrp,cgrp,sound

function preload(){
  bgimg = loadImage("tower.png");
  ghostimg = loadImage("ghost-standing.png");
  climberImg = loadImage("climber.png");
  doorimg = loadImage("door.png");
  sound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  bg = createSprite(300,300,10,10);
  bg.addImage(bgimg);
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostimg);
  ghost.scale = 0.35; 
  
  sound.loop();
  
  igrp= new Group();
  dgrp= new Group();
  cgrp= new Group();
}

function draw(){
  
  background("black");
  
  bg.velocityY = +5;
  
  if(gamestate === "play"){
    if(keyDown("space")){
    ghost.velocityY = -10;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(keyWentDown("left")){
    ghost.velocityX = -10;
  }
  
    ghost.collide(cgrp);
    
  if(keyWentDown("right")){
    ghost.velocityX = 10;
  }
  if(ghost.y>= 600 || ghost.isTouching(igrp)){
    gamestate = "end";
  }
  a();
  if(bg.y>600){
    bg.y = 300;
  }
  }
  
  if(gamestate==="end"){
    fill("yellow");
    textSize(32);
    text("Game Over",200,300);
    bg.visible = false;
    ghost.visible=false;
    cgrp.destroyEach();
    dgrp.destroyEach();
  }
  
  
  console.log(gamestate);
  
  drawSprites();
}

function a(){
  
  if(frameCount%80===0){
    var door = createSprite(Math.round(random(110,490)),20,10,10);
    door.addImage(doorimg);
    door.velocityY=  4;
    dgrp.add(door);
    
    var climber = createSprite(0,80,10,10);
    climber.addImage(climberImg);
    climber.velocityY = 4;
    cgrp.add(climber)
     
    i = createSprite(0,90,90,10);
    i.velocityY = 4;
    i.visible = false;
    igrp.add(i);
    
    ghost.depth = door.depth;
    ghost.depth= ghost.depth+1
    
    i.lifetime = 200;
    climber.lifetime = 200;
    door.lifetime = 200;
    
    climber.x = door.x;
    i.x = door.x;
  }   
}