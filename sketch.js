var underwater,underwaterimg
var fishimg,fish2img,rockimg,jellyfishimg,sharkimg
var octopusimg,heartimg;
var swimmerimg;
var goldencoinimg,jemimg,treasureimg;
var score=0;
var life=4;
var gameoverimg,restartimg
var coinsound,win,lifelost;
var gameState="play";


function preload()
{
underwaterimg=loadImage("underwater.jpg")
fishimg=loadImage("fish.png")	
fish2img=loadImage("fish2.png")
jellyfishimg=loadImage("jellyfish.png")
sharkimg=loadImage("shark.png")
rockimg=loadImage("rock.png")
octopusimg=loadImage("octopus.png")
swimmerimg=loadImage("swimmer.png")
goldencoinimg=loadImage("goldencoin.png")
jemimg=loadImage("jem.png")
heartimg=loadImage("game lifes.png")
gameoverimg=loadImage("game over.png")
restartimg=loadImage("restart button.png")
win=loadSound("win.wav")
coinsound=loadSound("coin.wav")
lifelost=loadSound("life lost.wav")
treasureimg=loadImage("treasure.png")

}

function setup() {
	createCanvas(900, 500);
underwater=createSprite(0,250)
underwater.addImage(underwaterimg)
underwater.velocityX=-2;

gameOver=createSprite(450,250)
restartButton=createSprite(450,400)

swimmer=createSprite(80,100)
swimmer.addImage(swimmerimg)
swimmer.scale=0.5;

treasure=createSprite(450,250)

rockGroup=new Group();
coinGroup= new Group();
jemGroup= new Group();
fishGroup= new Group();

heart1=createSprite(750,70)
heart2=createSprite(800,70)
heart3=createSprite(850,70)
heart1.addImage(heartimg)
heart2.addImage(heartimg)
heart3.addImage(heartimg)
heart1.scale=0.15
heart2.scale=0.15
heart3.scale=0.15
}


function draw() {
	background(underwaterimg)
	if(gameState==="play"){
		gameOver.visible=false
		restartButton.visible=false
		heart2.visible=true;
	heart1.visible=true;
	heart3.visible = true;
	treasure.visible = false;
 if(underwater.x<0){

	underwater.x=900
 }
 if(keyDown(UP_ARROW)){
	 swimmer.y-=5;
 }
 if(keyDown(DOWN_ARROW)){
	swimmer.y+=5;
}
  spawnrock();
  spawnFish();
  spawncoin();
  spawnjem();

  if(score===10){
	 
	  treasure.addImage(treasureimg);
	  treasure.visible = true;
	 gameState = "win"
  }
for(var i=0;i<coinGroup.length;i++){
	if(coinGroup.get(i).isTouching(swimmer)){
		coinGroup.get(i).destroy();
		score=score+10;
		coinsound.play();
	}
}
for(var i=0;i<jemGroup.length;i++){
	if(jemGroup.get(i).isTouching(swimmer)){
		jemGroup.get(i).destroy();
		score=score+30;
	}
}
for(var i=0;i<fishGroup.length;i++){
	if(fishGroup.get(i).isTouching(swimmer)){
		fishGroup.get(i).destroy();
		life=life-1
		//heart3.destroy();
	heart2.visible=true;
	heart1.visible=false;
	heart3.visible = false;

	}
}


for(var i=0;i<rockGroup.length;i++){
	if(rockGroup.get(i).isTouching(swimmer)){
		life=life-1
	rockGroup.get(i).destroy();
		//heart3.destroy();
	heart2.visible=true;
	heart1.visible=false;
		heart3.visible = false;
	}
}
if(life === 3){
	heart1.visible = true;
	heart2.visible = true;
	heart3.visible = false;
}
if(life===2){
	heart3.visible=false;
	heart2.visible = false;
	heart1.visible = true;
	//heart2.destroy();
	heart1.visible=true;
}

if(life===1){
	heart3.visible=false;
	heart2.visible=false;
	heart1.visible= false;
	//heart1.destroy();
	gameState="end";
	lifelost.play();
}
}

if(gameState==="end"){
	gameOver.visible=true
	restartButton.visible=true
	
	gameOver.addImage(gameoverimg);
	restartButton.addImage(restartimg)
	gameOver.scale=0.6
	restartButton.scale=0.25;
	coinGroup.setVelocityX = 0;
	fishGroup.setVelocityX = 0;
	jemGroup.setVelocityX=0;
	rockGroup.setVelocityX-0;

	if(mousePressedOver(restartButton)){
		gameOver.visible = false;
		restartButton.visible=false;
		gameState="play";
		life = 4;
		score=0;
		
	}
}

if(gameState === "win"){
	coinGroup.setVelocityX = 0;
	fishGroup.setVelocityX = 0;
	jemGroup.setVelocityX=0;
	rockGroup.setVelocityX-0;
	
}




drawSprites();
textSize(27);
fill("black");
text("SCORE - "+score,730,50)


}


function spawnFish(){
if(frameCount%200===0){
	fish=createSprite(950,200)
	fish.velocityX=-4;
	fish.scale=0.25;
	fish.y=Math.round(random(100,300))
	
fish.lifetime=250;

	var rand=Math.round(random(1,4))
	switch(rand){
		case 1:fish.addImage(fishimg)
		break
		case 2: fish.addImage(fish2img)
		break
		case 3: fish.addImage(jellyfishimg)
		break
		case 4: fish.addImage(sharkimg)
		break
	}
fishGroup.add(fish)
}
}

function spawnrock(){
	if(frameCount%150===0){
		rock=createSprite(950,450)
		rock.velocityX=-4;
		rock.scale=0.25;
		//rock.y=Math.round(random(100,300))

	rock.lifetime=250;

		var rand=Math.round(random(1,2))
		switch(rand){
			case 1:rock.addImage(octopusimg)
			break
			case 2: rock.addImage(rockimg)
			break
			
		}
		rockGroup.add(rock)
	}
	}
	function spawncoin(){
		if(frameCount%90===0){
			coin=createSprite(950,450)
			coin.velocityX=-7;
			coin.scale=0.1;
			coin.y=Math.round(random(50,450))
	
		coin.lifetime=180;
	coin.addImage(goldencoinimg)
	coinGroup.add(coin)	
		}
		
		}
		function spawnjem(){
			if(frameCount%400===0){
				jem=createSprite(950,450)
				jem.velocityX=-7;
				jem.scale=0.2;
				jem.y=Math.round(random(50,450))
		
			jem.lifetime=180;
		jem.addImage(jemimg)
			jemGroup.add(jem)	
			}
			}
		
	