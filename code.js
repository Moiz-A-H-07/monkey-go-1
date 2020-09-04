var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","bc81a644-6024-428f-95c0-e4d908c4d128","f33677c9-0042-44e8-b1e1-18046951b5a5"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":5,"version":"Z7wHlRnu6Lu1oYWr6svzPM6jdN8TcG.T","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana 1","sourceUrl":null,"frameSize":{"x":600,"y":524},"frameCount":1,"looping":true,"frameDelay":12,"version":"4leYqC3nrkK6gIsX4wXYwHgC1VOqHpyU","loadedFromSource":true,"saved":true,"sourceSize":{"x":600,"y":524},"rootRelativePath":"assets/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":null,"frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"GTNOSAWScxbe0i0t5IouFhS1Lv1oCerL","loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/33841f90-7a53-4346-b956-e51d1961959b.png"},"bc81a644-6024-428f-95c0-e4d908c4d128":{"name":"farm_land","sourceUrl":"assets/api/v1/animation-library/gamelab/8RkOLYC69Uhn.b7A1GaLNOBfPiC_hGvT/category_backgrounds/farm_land.png","frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"8RkOLYC69Uhn.b7A1GaLNOBfPiC_hGvT","loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/8RkOLYC69Uhn.b7A1GaLNOBfPiC_hGvT/category_backgrounds/farm_land.png"},"f33677c9-0042-44e8-b1e1-18046951b5a5":{"name":"Banana 2","sourceUrl":null,"frameSize":{"x":600,"y":524},"frameCount":1,"looping":true,"frameDelay":12,"version":"NQ1WNn8ck9imLBk40Dhj09lkTwP5y71d","loadedFromSource":true,"saved":true,"sourceSize":{"x":600,"y":524},"rootRelativePath":"assets/f33677c9-0042-44e8-b1e1-18046951b5a5.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----


var bacground = createSprite(200,200,20,20);
bacground.setAnimation("farm_land");

var player = createSprite(100, 310,20,20);
player.setAnimation("monkey");
player.scale=0.2;
player.setVelocityX=5;

var ground = createSprite(400, 370,800,10);
ground.velocityX=-4;
ground.x=ground.width/2;
ground.visible=false;

var score=0;
var fruitgroup= createGroup();
var stgroup= createGroup();














function draw() {
  drawSprites();
   
   score=score+Math.round(World.frameRate/60);
   
  if (ground.x<0) {
    ground.x=ground.width/2;
  }
  ground.velocityX=-(10+score/100);
  
  textSize(30);
  fill("black");
 text("survival time = "+score,100,50);
 player.collide(ground); 
  if (keyDown("space") && player.y>150) {
     player.velocityY=-12;
//playSound("assets/category_jump/classic_jump_2.mp3");
}

player.velocityY=player.velocityY+0.4;

food();
obstacle();

if (player.isTouching(fruitgroup)) {
  fruitgroup.destroyEach();
}
if (player.isTouching(stgroup)) {
 score=0;
 stgroup.setVelocityXEach(0);
 fruitgroup.setVelocityXEach(0);
 player.VelocityX=0;
}
}

function food() {
 if(World.frameCount%80==0){
   var banana = createSprite(400,randomNumber(120,200));
   var select=randomNumber(1,2);
banana.setAnimation("Banana "+select);
banana.scale=0.1;
banana.velocityX=-5;
banana.lifetime=140;
fruitgroup.add(banana);
 } 
 
}
function obstacle() {
  if (World.frameCount%300==0) {
   var stone=createSprite(400,310);
   stone.setAnimation("Stone");
   stone.scale=0.3;
   stone.velocityX=-3;
   stone.lifetime=140;  
   stgroup.add(stone);
  

}
}

/*function obstacle() {
if (World.frameCount%300==0) {
   var stone = createSprite(300,345,10,10);
   stone.setAnimation("Stone");
   stone.scale=0.2;
   stone.ve
  }
    
}*/



// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
