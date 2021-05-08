//GLOBAL VARIABLES
var title = "jpAdventure";
var myAnimation;
var mynumber = 1;
var fps = 25;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var leftPressed = false;
var upPressed = false;
var rightPressed = false;
var downPressed = false;
var firePressed = false;
var gameWidth = 1280;
var gameHeight = gameWidth / (window.innerWidth/window.innerHeight);
var gWidthRatio = innerWidth / gameWidth;
var gHeightRatio = innerHeight / gameHeight;
var c = document.getElementById("gameCanvas");
c.width = gameWidth;
c.height = gameHeight;
c.style.width = "100%";
var ctx = c.getContext("2d");
ctx.font = "bold 18px Arial";
ctx.textAlign = "center";
ctx.textBaseline="middle";

var gameScreen;

//howler sounds
var bgmusic = new Howl({
  src: ['../assets/audio/bgmusic.mp3'],
  loop: true
});
var fireSound = new Howl({
  src: ['../assets/audio/fire.mp3']
});
fireSound.volume(.3);
var clickSound = new Howl({
  src: ['../assets/audio/click.mp3']
});
var explosionSound = new Howl({
  src: ['../assets/audio/explosion.mp3']
});
var collectSound = new Howl({
  src: ['../assets/audio/collect.mp3']
});
var enemyhitSound = new Howl({
  src: ['../assets/audio/enemyhit.mp3']
});
enemyhitSound.volume(.5);

//game image objects
var GameImageSimple = function(imagefile){
	this.image = new Image();
	this.image.src = imagefile;
	this.cor1;
	this.cor2;
	this.cor3;
	this.cor4;
	/*
	note for image scaling
	wh 0 = default width & height
	wh -1 = 100% of screen
	w/h -2 = maintain aspect ratio related to one of w/h
	*/
	this.draw = function(x, y, w, h){
		var imageWidth, imageHeight, anchX, anchY;
		anchX = this.image.width/2;
		anchY = this.image.height/2;
		if(w == 0) imageWidth = this.image.width;
		else imageWidth = w;
		if(h == 0) imageHeight = this.image.height;
		else imageHeight = h;
		if(w == -1){
			imageWidth = this.image.width * (gameWidth/this.image.width);
			anchX = gameWidth/2;
		}
		if(h == -1){
			imageHeight = this.image.height * (gameHeight/this.image.height);
			anchY = gameHeight/2;
		}
		if(w == -2){
			imageWidth = (gameHeight/this.image.height)*this.image.width;
			anchX = imageWidth/2;
		}
		if(h == -2){
			imageHeight = (gameWidth/this.image.width)*this.image.height;
			anchY = imageHeight/2;
		}
		ctx.drawImage(this.image, x-anchX, y-anchY, imageWidth, imageHeight);
		this.cor1 = x-anchX;
		this.cor2 = y-anchY;
		this.cor3 = x+anchX;
		this.cor4 = y+anchY;
		
		/*
		cor1 = leftX
		cor2 = UpY
		cor3 = rightX
		cor4 = bottomY
		*/
	}
}

//animated game image objects
var GameImageAnimated = function(imagefile, divider){
	this.image = new Image();
	this.image.src = imagefile;
	this.cor1;
	this.cor2;
	this.cor3;
	this.cor4;
	this.currentAnimFrame = 0;
	this.frameCounter = 0;
	this.repCounter = 0;
	
	this.draw = function(stillOrAnim, x, y, startFrame, endFrame, spriteFps, rep){
		var imageWidth, imageHeight, anchX, anchY, frameCounts;
		imageWidth = this.image.width/divider;
		imageHeight = this.image.height;
		anchX = imageWidth/2;
		anchY = imageHeight/2;

		if(stillOrAnim == "still") ctx.drawImage(this.image, startFrame * imageWidth - imageWidth, 0, imageWidth, imageHeight, x-anchX, y-anchY, imageWidth, imageHeight);
		else if(stillOrAnim == "anim"){
			if(rep == 0){
				if(this.currentAnimFrame < startFrame) this.currentAnimFrame = startFrame;
				if(this.currentAnimFrame > endFrame) this.currentAnimFrame = startFrame;
				ctx.drawImage(this.image, imageWidth * this.currentAnimFrame - imageWidth, 0, imageWidth, imageHeight, x-anchX, y-anchY, imageWidth, imageHeight);
				this.frameCounter += spriteFps/fps;
				if(this.frameCounter > 1){
					this.frameCounter = 0;
					this.currentAnimFrame += 1;
				}
			}else if(rep > 0){
				if(this.repCounter < rep){
					if(this.currentAnimFrame < startFrame) this.currentAnimFrame = startFrame;
					if(this.currentAnimFrame > endFrame) this.currentAnimFrame = startFrame;
					ctx.drawImage(this.image, imageWidth * this.currentAnimFrame - imageWidth, 0, imageWidth, imageHeight, x-anchX, y-anchY, imageWidth, imageHeight);
					this.frameCounter += spriteFps/fps;
					if(this.frameCounter > 1){
						this.frameCounter = 0;
						this.currentAnimFrame += 1;
					}
					if(this.currentAnimFrame >= endFrame - startFrame + 1) this.repCounter++;
					if(this.repCounter >= rep) return true;
				}
			}
		}
		
		this.cor1 = x-anchX;
		this.cor2 = y-anchY;
		this.cor3 = x+anchX;
		this.cor4 = y+anchY;
	}
}

var btnUp = new GameImageAnimated("../assets/images/btn-up.png", 2);
var btnDown = new GameImageAnimated("../assets/images/btn-down.png", 2);
var btnLeft = new GameImageAnimated("../assets/images/btn-left.png", 2);
var btnRight = new GameImageAnimated("../assets/images/btn-right.png", 2);
var btnFire = new GameImageAnimated("../assets/images/wand.png", 2);

var bullet = new GameImageAnimated("../assets/images/jpBullet.png", 4);
var bulletMetal = new GameImageAnimated("../assets/images/jpBulletMetal.png", 1);
var bulletMG = new GameImageAnimated("../assets/images/jpBulletMG.png", 1);

var jetpacker = new GameImageAnimated("../assets/images/wizard.png", 9);
var weaponUps = new GameImageAnimated("../assets/images/weaponUps.png", 5);
var explosion = new GameImageAnimated("../assets/images/explosion.png", 5);

var simpleEnemy = new GameImageAnimated("../assets/images/bat.png", 1);
var simpleEnemy2 = new GameImageAnimated("../assets/images/ghost.png", 1);
var enemyBullets = new GameImageAnimated("../assets/images/enemyBullets.png", 1);

var textButtons = new GameImageAnimated("../assets/images/textButtons.png", 3);
var titleImage = new GameImageAnimated("../assets/images/title.png", 1);

var floor = new GameImageAnimated("../assets/images/floor.png", 1);
var bg = new GameImageAnimated("../assets/images/back2.png", 1);

var firingAllowed = true;

var jetPacker;

var playerLevel;
var playerHighScore;
if(localStorage.getItem(title+"HighScore") === null){
	localStorage.setItem(title+"HighScore", 0);
}
playerHighScore = localStorage.getItem(title+"HighScore");
var playerCurrentScore;
var gamePlayCounter;
var gamePlayCounterLimit;

var weaponUpTimeLimit;
var tempWeaponUpCounter;
var weaponUp;

var enemies1;
var enemies1_aprnce_interval;
var enemies1_counter;
var enemies1_bullets;
var enemies1_firing_interval; 

var enemies2;
var enemies2_aprnce_interval;
var enemies2_counter;
var enemies2_bullets;
var enemies2_firing_interval; 

//load logo and start the game after it
var zklogo = new GameImageSimple("../assets/images/spellbind.jpg");
zklogo.image.onload = function(){
	startScene("start");
}

function startScene(x){
	switch (x) {
		case "start" :
			$("#blackScreen").fadeIn(500, function(){
				gameScreen = "start";
				zklogo.draw(gameWidth/2, gameHeight/2, 0, 0);
				var tempInterv = setTimeout(function(){
					clearInterval(tempInterv);
					startScene("mainmenu");
				}, 2000);
			});
			$("#blackScreen").fadeOut(500);
			break;
		case "gameover" :
			stop();
			$("#blackScreen").fadeIn(500, function(){	
				gameScreen = "gameover";
				ctx.clearRect(0, 0, gameWidth, gameHeight);
				ctx.fillStyle = "#cfecff";
				ctx.fillRect(0, 0, gameWidth, gameHeight);
				ctx.fillStyle = "black";
				ctx.textAlign = "center";
				textButtons.draw("still", gameWidth/2, gameHeight/2 + 50, 3, 0, 0, 0);
				titleImage.draw("still", gameWidth/2, gameHeight/2 - 50, 1, 0, 0, 0);
			});
			$("#blackScreen").fadeOut(500);
			break;
		case "mainmenu" :
			stop();
			$("#blackScreen").fadeIn(500, function(){	
				gameScreen = "gameover";
				ctx.clearRect(0, 0, gameWidth, gameHeight);
				ctx.fillStyle = "#cfecff";
				ctx.fillRect(0, 0, gameWidth, gameHeight);
				ctx.fillStyle = "black";
				ctx.textAlign = "center";
				textButtons.draw("still", gameWidth/2, gameHeight/2 + 50, 1, 0, 0, 0);
				titleImage.draw("still", gameWidth/2, gameHeight/2 - 50, 1, 0, 0, 0);
			});
			$("#blackScreen").fadeOut(500);
			break;
		case "adventure" :
			$("#blackScreen").fadeIn(500, function(){
				bgmusic.play();
				reset();
				gameScreen = "adventure";
				loopDGame();
			});
			$("#blackScreen").fadeOut(500);
			break;
	}
}

function loopDGame() {
	
	myAnimation = requestAnimationFrame(loopDGame);
	
	now = Date.now();
    delta = now - then;
     
    if (delta > interval) {
		then = now - (delta % interval);
		//update codes here
		update();
	}
}

function stop(){
	cancelAnimationFrame(myAnimation);
}

function update(){	
	ctx.clearRect(0, 0, gameWidth, gameHeight);
	ctx.fillStyle = "#cfecff";
	ctx.fillRect(0, 0, gameWidth, gameHeight);
	ctx.fillStyle = "black";
	
	generateBg();
	generateFloor();
	generateWeaponUp();
	generateEnemies1();
	generateEnemies2();
	moveJetPacker();
	showWeaponStatus();
	
	updateLevel();
	
	if(upPressed) btnUp.draw("still", 200, gameHeight - 250, 2, 0, 0, 0);
	else btnUp.draw("still", 200, gameHeight - 250, 1, 0, 0, 0);
	if(downPressed) btnDown.draw("still", 200, gameHeight - 100, 2, 0, 0, 0);
	else btnDown.draw("still", 200, gameHeight - 100, 1, 0, 0, 0);
	if(rightPressed) btnRight.draw("still", 325, gameHeight - 175, 2, 0, 0, 0);
	else btnRight.draw("still", 325, gameHeight - 175, 1, 0, 0, 0);
	if(leftPressed) btnLeft.draw("still", 75, gameHeight - 175, 2, 0, 0, 0);
	else btnLeft.draw("still", 75, gameHeight - 175, 1, 0, 0, 0);
	if(firePressed) btnFire.draw("still", gameWidth - 100, gameHeight - 100, 2, 0, 0, 0);
	else btnFire.draw("still", gameWidth - 100, gameHeight - 100, 1, 0, 0, 0);
}

$(document).keydown(function(e){
	if (e.keyCode == 37) { 
		leftPressed = true;
		return false;
	}
	if (e.keyCode == 38) { 
		upPressed = true;
		return false;
	}
	if (e.keyCode == 39) { 
		rightPressed = true;
		return false;
	}
	if (e.keyCode == 40) { 
		downPressed = true;
		return false;
	}
	if (e.keyCode == 32) { 
		firePressed = true;
		return false;
	}
});

$(document).keyup(function(e){
	if (e.keyCode == 37) { 
		leftPressed = false;
		return false;
	}
	if (e.keyCode == 38) { 
		upPressed = false;
		return false;
	}
	if (e.keyCode == 39) { 
		rightPressed = false;
		return false;
	}
	if (e.keyCode == 40) { 
		downPressed = false;
		return false;
	}
	if (e.keyCode == 32) { 
		firePressed = false;
		return false;
	}
});

document.getElementById("gameCanvas").addEventListener('mousedown', function(e){
	var cursorX = e.clientX/gWidthRatio;
	var cursorY = e.clientY/gHeightRatio;
	if(gameScreen == "mainmenu") if(checkClick(cursorX, cursorY, textButtons)){
		clickSound.play();
		startScene("adventure");
	}
	if(gameScreen == "adventure") if(checkClick(cursorX, cursorY, textButtons)){
		clickSound.play();
		resume();
	}
	if(gameScreen == "gameover") if(checkClick(cursorX, cursorY, textButtons)){
		clickSound.play();
		startScene("adventure");
	}
}, false);

document.getElementById("gameCanvas").addEventListener('touchstart', function(e){
	var userTouches = e.changedTouches;
	for(var j = 0; j < userTouches.length; j++){
		switch (gameScreen){
			case "adventure" :
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnUp)) upPressed = true;
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnDown)) downPressed = true;
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnLeft)) leftPressed = true;
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnRight)) rightPressed = true;
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnFire)) firePressed = true;
				break;
		}
	}	
}, false);

document.getElementById("gameCanvas").addEventListener('touchend', function(e){
	var userTouches = e.changedTouches;
	for(var j = 0; j < userTouches.length; j++){
		switch (gameScreen){
			case "adventure" :
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnUp)) upPressed = false;
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnDown)) downPressed = false;
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnLeft)) leftPressed = false;
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnRight)) rightPressed = false;
				if(checkClick(userTouches[j].pageX/gWidthRatio, userTouches[j].pageY/gHeightRatio, btnFire)) firePressed = false;
				break;
		}
	}
	if(e.touches.length == 0){
		leftPressed = false;
		upPressed = false;
		rightPressed = false;
		firePressed = false;
	}
}, false);

//click collision detection
function checkClick(x, y, clickable){
	if(x > clickable.cor1 && y > clickable.cor2 && x < clickable.cor3 && y < clickable.cor4){
		return true;
	}
	return false;
}

//image to image collision detection
function checkClick2(firstImage, secondImage){
	var fi = [];
	fi[0] = {"x" : firstImage.cor1, "y" : firstImage.cor2};
	fi[1] = {"x" : firstImage.cor1, "y" : firstImage.cor4};
	fi[2] = {"x" : firstImage.cor2, "y" : firstImage.cor2};
	fi[3] = {"x" : firstImage.cor2, "y" : firstImage.cor4};
	for(var i = 0; i < 4; i++){
		if(checkClick(fi[i].x, fi[i].y, secondImage)) return true; 
	}
	return false;
}

//check bullet collision
function checkBulletHit(bullet, bulletIndex){
		if(enemies1_bullets.length > 0){
			if(bullet == enemies1_bullets){
				for(var eb = 0; eb < enemies1_bullets.length; eb++){
					if(checkClick(bullet[eb].posX, bullet[eb].posY, jetpacker)){
						enemies1_bullets.splice(eb, 1);
						eb -= 1;
						return true;
					}
				}
			}
		}
		if(enemies2_bullets.length > 0){
			if(bullet == enemies2_bullets){
				for(var eb = 0; eb < enemies2_bullets.length; eb++){
					if(checkClick(bullet[eb].posX, bullet[eb].posY, jetpacker)){
						enemies2_bullets.splice(eb, 1);
						eb -= 1;
						return true;
					}
				}
			}
		}
		if(enemies1.length > 0 || enemies2.length > 0){
			if(bullet == jetPacker.bullets){			
				for(var enm = 0; enm < enemies1.length; enm++){
					if(bullet[bulletIndex].posX > enemies1[enm].posX - enemies1[enm].disFromCenter && bullet[bulletIndex].posY > enemies1[enm].posY - enemies1[enm].disFromCenter && bullet[bulletIndex].posX < enemies1[enm].posX + enemies1[enm].disFromCenter && bullet[bulletIndex].posY < enemies1[enm].posY + enemies1[enm].disFromCenter){
						enemies1[enm].health -= bullet[bulletIndex].damagePw;
						explosion.draw("still", bullet[bulletIndex].posX, bullet[bulletIndex].posY, 1, 0, 0, 0);
						if(enemies1[enm].health < 1){
							explosion.draw("still", enemies1[enm].posX, enemies1[enm].posY, 2, 0, 0, 0);
							explosion.draw("still", enemies1[enm].posX, enemies1[enm].posY, 3, 0, 0, 0);
							playerCurrentScore += 100;
							enemies1.splice(enm, 1);
							enm -= 1;
							explosionSound.play();
						}
						return true;
					}
				}
				for(var enm = 0; enm < enemies2.length; enm++){
					if(bullet[bulletIndex].posX > enemies2[enm].posX - enemies2[enm].disFromCenter && bullet[bulletIndex].posY > enemies2[enm].posY - enemies2[enm].disFromCenter && bullet[bulletIndex].posX < enemies2[enm].posX + enemies2[enm].disFromCenter && bullet[bulletIndex].posY < enemies2[enm].posY + enemies2[enm].disFromCenter){
						enemies2[enm].health -= bullet[bulletIndex].damagePw;
						explosion.draw("still", bullet[bulletIndex].posX, bullet[bulletIndex].posY, 1, 0, 0, 0);
						if(enemies2[enm].health < 1){
							explosion.draw("still", enemies2[enm].posX, enemies2[enm].posY, 2, 0, 0, 0);
							explosion.draw("still", enemies2[enm].posX, enemies2[enm].posY, 3, 0, 0, 0);
							playerCurrentScore += 300;
							enemies2.splice(enm, 1);
							enm -= 1;
							explosionSound.play();
						}
						return true;
					}
				}
			}
		}
	return false;
};

function moveJetPacker(){
	updateShootingLine();
	var minSpeed = .01;
	var maxSpeed = 6;
	var multiplier = 1.35;
	drawPlayerHealthStatus();
	if(jetPacker.health <= 0){
		startScene("gameover");
		return;
	}
	if(upPressed){
		if(jetPacker.moveY < maxSpeed){
			if(jetPacker.moveY <= 0) jetPacker.moveY = minSpeed;
			jetPacker.moveY *= multiplier;
		}
		if(jetpacker.cor2 > 0) jetPacker.posY -= jetPacker.moveY;
	}else if(!upPressed){
		if(jetPacker.moveY > minSpeed){
			jetPacker.moveY /= multiplier;
			if(jetpacker.cor2 > 0) jetPacker.posY -= jetPacker.moveY;
		} 
	}
	if(leftPressed){		
		if(jetPacker.direction == "" || jetPacker.direction == "left" && jetPacker.direction != "onfoot"){
			if(jetPacker.moveX < maxSpeed){
				jetPacker.direction = "left";
				if(jetPacker.moveX <= 0) jetPacker.moveX = minSpeed;
				jetPacker.moveX *= multiplier;
			}else if(jetPacker.moveX >= maxSpeed) jetPacker.moveX /= multiplier;
			if(jetpacker.cor1 > 0) jetPacker.posX -= jetPacker.moveX;
			if(jetpacker.cor2 > 0) jetPacker.posY -= jetPacker.moveX/2;
		}
	}else if(!leftPressed){
		if(jetPacker.moveX > minSpeed && jetPacker.direction == "left"){
			jetPacker.moveX /= multiplier;
			if(jetpacker.cor1 > 0) jetPacker.posX -= jetPacker.moveX;
		}
	}
	if(rightPressed){
		if(jetPacker.direction == "" || jetPacker.direction == "right" && jetPacker.direction != "onfoot"){
			if(jetPacker.moveX < maxSpeed){
				jetPacker.direction = "right";
				if(jetPacker.moveX <= 0) jetPacker.moveX = minSpeed;
				jetPacker.moveX *= multiplier;
			}else if(jetPacker.moveX >= maxSpeed) jetPacker.moveX /= multiplier;
			if(jetpacker.cor3 < gameWidth) jetPacker.posX += jetPacker.moveX;
			if(jetpacker.cor2 > 0) jetPacker.posY -= jetPacker.moveX/2;
		} 
	}else if(!rightPressed){
		if(jetPacker.moveX > minSpeed && jetPacker.direction == "right"){
			jetPacker.moveX /= multiplier;
			if(jetpacker.cor3 < gameWidth) jetPacker.posX += jetPacker.moveX;
		}
	}
	
	//gravity
	if(jetpacker.cor4 < gameHeight - 50){
		if(downPressed) jetpacker.draw("still", jetPacker.posX, jetPacker.posY, 1, 0, 0, 0);
		else{
			if(jetPacker.gravity < maxSpeed/3){
				if(jetPacker.gravity == 0) jetPacker.gravity = .01;
				jetPacker.gravity *= multiplier;
			}
			jetPacker.posY += jetPacker.gravity;
			if(jetPacker.moveX <= .5) jetPacker.direction = "";
			jetpacker.draw("anim", jetPacker.posX, jetPacker.posY, 2, 4, 12, 0);
		}
	}else{
		jetPacker.gravity = 0;
		jetpacker.draw("anim", jetPacker.posX, jetPacker.posY, 5, 9, 12, 0);
	}
	
	//go down(faster gravity)
	if(downPressed){
		if(jetpacker.cor4 < gameHeight - 50){
			jetPacker.posY += 4;
		} else jetPacker.direction = "";
	}
	
	//wind
	if(jetPacker.gravity != 0 && jetpacker.cor1 > 0) jetPacker.posX -= .25;	
	
	//fire
	if(firePressed){
		if(firingAllowed){
			fireSound.play();
			var randomY = Math.random() * 10;
			switch (jetPacker.weaponType){
				case "basic" :
					jetPacker.bullets.push({"posX" : jetPacker.posX + 10, "posY" : jetPacker.posY + randomY, "bulletType" : "basic", "bulletSpeed" : 15, "damagePw" : 1, "yMove" : 0});
					break;
				case "metal" :
					if(jetPacker.ammo > 0){
						jetPacker.bullets.push({"posX" : jetPacker.posX + 10, "posY" : jetPacker.posY + randomY, "bulletType" : "metal", "bulletSpeed" : 19, "damagePw" : 5, "yMove" : 0});
						jetPacker.ammo -= 1;
					} else if(jetPacker.ammo <= 0) jetPacker.weaponType = "basic";
					break;
				case "tripleBasic" :
					if(jetPacker.ammo > 0){
						jetPacker.bullets.push({"posX" : jetPacker.posX + 10, "posY" : jetPacker.posY + randomY + 10, "bulletType" : "tripleBasic", "bulletSpeed" : 25, "damagePw" : 1, "yMove" : 1});
						jetPacker.bullets.push({"posX" : jetPacker.posX + 10, "posY" : jetPacker.posY + randomY, "bulletType" : "tripleBasic", "bulletSpeed" : 25, "damagePw" : 1, "yMove" : 0});
						jetPacker.bullets.push({"posX" : jetPacker.posX + 10, "posY" : jetPacker.posY + randomY - 10, "bulletType" : "tripleBasic", "bulletSpeed" : 25, "damagePw" : 1, "yMove" : -1});
						jetPacker.ammo -= 3;
					} else if(jetPacker.ammo <= 0) jetPacker.weaponType = "basic";
					break;
				case "MG" :
					if(jetPacker.ammo > 0){
						jetPacker.bullets.push({"posX" : jetPacker.posX + 10, "posY" : jetPacker.posY + randomY - 40, "bulletType" : "MG", "bulletSpeed" : 21, "damagePw" : 1, "yMove" : .30});
						jetPacker.bullets.push({"posX" : jetPacker.posX + 10, "posY" : jetPacker.posY + randomY + 40, "bulletType" : "MG", "bulletSpeed" : 21, "damagePw" : 1, "yMove" : -.30});
						jetPacker.bullets.push({"posX" : jetPacker.posX + 20, "posY" : jetPacker.posY + randomY + 20, "bulletType" : "MG", "bulletSpeed" : 21, "damagePw" : 1, "yMove" : -.15});
						jetPacker.bullets.push({"posX" : jetPacker.posX + 20, "posY" : jetPacker.posY + randomY - 20, "bulletType" : "MG", "bulletSpeed" : 21, "damagePw" : 1, "yMove" : .15});
						jetPacker.bullets.push({"posX" : jetPacker.posX + 30, "posY" : jetPacker.posY + randomY, "bulletType" : "MG", "bulletSpeed" : 21, "damagePw" : 1, "yMove" : -.0});
						jetPacker.ammo -= 5;
					} else if(jetPacker.ammo <= 0) jetPacker.weaponType = "basic";
					break;
				default :
					if(jetPacker.ammo > 0){
						jetPacker.bullets.push({"posX" : jetPacker.posX + 10, "posY" : jetPacker.posY + randomY, "bulletType" : "basic", "bulletSpeed" : 15, "damagePw" : 1, "yMove" : 0});
						jetPacker.ammo -= 1;
					} else if(jetPacker.ammo <= 0) jetPacker.weaponType = "basic";
					break;
			}
			firingAllowed = false;
			setTimeout(function(){firingAllowed = true;}, jetPacker.firingInterval);
		}
		
	}
	
	//updating jetpacker bullets
	if(jetPacker.bullets.length > 0){
		for(var i = 0; i < jetPacker.bullets.length; i ++){
			if(jetPacker.bullets[i].posX > gameWidth + 100){
				jetPacker.bullets.splice(i, 1);
				i -= 1;
			}else{
				switch(jetPacker.bullets[i].bulletType){
					case "basic" :
						jetPacker.bullets[i].posX += jetPacker.bullets[i].bulletSpeed;
						bullet.draw("anim", jetPacker.bullets[i].posX + jetPacker.bullets[i].bulletSpeed, jetPacker.bullets[i].posY, 1, 4, 20, 0);
						break;
					case "metal" :
						jetPacker.bullets[i].posX += jetPacker.bullets[i].bulletSpeed;
						bulletMetal.draw("still", jetPacker.bullets[i].posX + jetPacker.bullets[i].bulletSpeed, jetPacker.bullets[i].posY, 1, 0, 0, 0);
						break;
					case "tripleBasic" :
						jetPacker.bullets[i].posX += jetPacker.bullets[i].bulletSpeed;
						jetPacker.bullets[i].posY += jetPacker.bullets[i].yMove;
						bullet.draw("anim", jetPacker.bullets[i].posX + jetPacker.bullets[i].bulletSpeed, jetPacker.bullets[i].posY - 6, 1, 4, 20, 0);
						break;
					case "MG" :
						jetPacker.bullets[i].posX += jetPacker.bullets[i].bulletSpeed;
						jetPacker.bullets[i].posY -= jetPacker.bullets[i].yMove;
						bulletMG.draw("still", jetPacker.bullets[i].posX + jetPacker.bullets[i].bulletSpeed, jetPacker.bullets[i].posY, 1, 0, 0, 0);
						break;
					default :
						jetPacker.bullets[i].posX += jetPacker.bullets[i].bulletSpeed;
						bullet.draw("anim", jetPacker.bullets[i].posX + jetPacker.bullets[i].bulletSpeed, jetPacker.bullets[i].posY, 1, 4, 20, 0);
						break;
				}
				if(checkBulletHit(jetPacker.bullets, i)){
					enemyhitSound.play();
					jetPacker.bullets.splice(i, 1);
					i -= 1;
				}
			}
		}
	}
}

//weaponups
function generateWeaponUp(){
	if(tempWeaponUpCounter >= weaponUpTimeLimit){
		tempWeaponUpCounter = 0;
		var tempBulletType = Math.floor(Math.random() * 4) + 1;
		var tempRandomY = Math.floor(Math.random() * (gameHeight - 300)) + 100;
		switch(tempBulletType){
			case 1 :
				tempBulletType = "health";
				break;
			case 2 :
				tempBulletType = "metal";
				break;
			case 3 :
				tempBulletType = "tripleBasic";
				break;
			case 4 :
				tempBulletType = "MG";
				break;
			default :
				tempBulletType = "basic";
				break;
		}
		weaponUp.push({
			"bulletType" : tempBulletType,
			"posX" : gameWidth + 100,
			"posY" : tempRandomY
		});
	}
	tempWeaponUpCounter++;
	if(weaponUp.length > 0){
		for(var i = 0; i < weaponUp.length; i++){
			switch(weaponUp[i].bulletType){
				case "health" :
					weaponUps.draw("still", weaponUp[i].posX, weaponUp[i].posY, 1, 0, 0, 0);
					break;
				case "metal" :
					weaponUps.draw("still", weaponUp[i].posX, weaponUp[i].posY, 3, 0, 0, 0);
					break;
				case "tripleBasic" :
					weaponUps.draw("still", weaponUp[i].posX, weaponUp[i].posY, 4, 0, 0, 0);
					break;
				case "MG" :
					weaponUps.draw("still", weaponUp[i].posX, weaponUp[i].posY, 5, 0, 0, 0);
					break;
			}
			weaponUp[i].posX -= 2;
			if(checkClick(weaponUp[i].posX, weaponUp[i].posY, jetpacker)){
				collectSound.play();
				switch(weaponUp[i].bulletType){
					case "health" :
						if(jetPacker.health < 5) jetPacker.health += 20;
						if(jetPacker.health > 5) jetPacker.health = 20;
						break;
					case "metal" :
						jetPacker.firingInterval = 600;
						jetPacker.ammo = 30;
						jetPacker.weaponType = weaponUp[i].bulletType;
						break;
					case "tripleBasic" :
						jetPacker.firingInterval = 400;
						jetPacker.ammo = 60;
						jetPacker.weaponType = weaponUp[i].bulletType;
						break;
					case "MG" :
						jetPacker.firingInterval = 230;
						jetPacker.ammo = 70;
						jetPacker.weaponType = weaponUp[i].bulletType;
						break;
				}
				weaponUp.splice(i, 1);
				i -= 1;
			}else if(weaponUp[i].posX < -100){
				weaponUp.splice(i, 1);
				i -= 1;
			}
		}
	}
}

function showWeaponStatus(){
	if (jetPacker.ammo < 0) jetPacker.ammo = 0;
	ctx.textAlign = "left";
	switch(jetPacker.weaponType){
		case "health" :
			break;
		case "basic" :
			weaponUps.draw("still", 20, 20, 2, 0, 0, 0);
			ctx.fillText("Unlimited", 40, 20);
			break;
		case "metal" :
			weaponUps.draw("still", 20, 20, 3, 0, 0, 0);
			ctx.fillText(jetPacker.ammo+"x", 40, 20);
			break;
		case "tripleBasic" :
			weaponUps.draw("still", 20, 20, 4, 0, 0, 0);
			ctx.fillText(jetPacker.ammo+"x", 40, 20);
			break;
		case "MG" :
			weaponUps.draw("still", 20, 20, 5, 0, 0, 0);
			ctx.fillText(jetPacker.ammo+"x", 40, 20);
			break;
		default :
			weaponUps.draw("still", 20, 20, 2, 0, 0, 0);
			ctx.fillText(jetPacker.ammo+"x", 40, 20);
			break;
	}
}

function generateEnemies1(){
	
	if(enemies1_counter < enemies1_aprnce_interval){
		if(enemies1_counter == 0){
			var tempRandomY = Math.random() * (gameHeight - 300) + 100;
			var tempRandomSpeed = Math.random() * 2;
			var distFromCenter;
			enemies1.push({
				"posX" : gameWidth + 100,
				"posY" : tempRandomY,
				"uniqSpeed" : tempRandomSpeed,
				"initHealth" : 10,
				"health" : 10,
				"disFromCenter" : 30,
				"firingTimer" : 0
			});
		}
		enemies1_counter++;
	}
	else enemies1_counter = 0;
	if(enemies1.length > 0){
		for(var i = 0; i < enemies1.length; i++){
			if(enemies1[i].posX > -100){
				simpleEnemy.draw("still", enemies1[i].posX, enemies1[i].posY, 1, 0, 0, 0);
				drawHealthStatus(enemies1[i], enemies1[i].posX - 50, enemies1[i].posY - enemies1[i].disFromCenter - 10 );
				enemies1[i].posX -= .5 + enemies1[i].uniqSpeed;
				if(enemies1[i].firingTimer < enemies1_firing_interval){
					if(enemies1[i].firingTimer == 0) enemies1_bullets.push({"posX" : enemies1[i].posX, "posY" : enemies1[i].posY});
					enemies1[i].firingTimer ++;
				}else if(enemies1[i].firingTimer >= enemies1_firing_interval) enemies1[i].firingTimer = 0;
				if(checkClick(enemies1[i].posX, enemies1[i].posY, jetpacker)){
					enemies1.splice(i, 1);
					i -= 1;
					jetPacker.health -= 3;
				}
			}else{
				enemies1.splice(i, 1);
				i -= 1;
			}
		}
	}
	if(enemies1_bullets.length > 0){
		for(var blt = 0; blt < enemies1_bullets.length; blt++){
			if(enemies1_bullets[blt].posX < -100){
				enemies1_bullets.splice(blt, 1);
				blt -= 1;
			}else{
				enemies1_bullets[blt].posX -= 4;
				enemyBullets.draw("still", enemies1_bullets[blt].posX, enemies1_bullets[blt].posY, 1, 0, 0, 0);
				if(checkBulletHit(enemies1_bullets, blt)){
					jetPacker.health -= 1;
					blt -= 1;
				}
			}
		}
	}
}

function generateEnemies2(){
	if(enemies2_counter < enemies2_aprnce_interval)	enemies2_counter++;
	else{
		var tempRandomY = Math.random() * (gameHeight - 300) + 100;
		var tempRandomSpeed = Math.random() * 2;
		var distFromCenter;
		enemies2.push({
			"posX" : gameWidth + 100,
			"posY" : tempRandomY,
			"uniqSpeed" : tempRandomSpeed,
			"initHealth" : 14,
			"health" : 14,
			"disFromCenter" : 30,
			"firingTimer" : 0
		});
		enemies2_counter = 0;
	}
	if(enemies2.length > 0){
		for(var i = 0; i < enemies2.length; i++){
			if(enemies2[i].posX > -100){
				simpleEnemy2.draw("still", enemies2[i].posX, enemies2[i].posY, 1, 0, 0, 0);
				drawHealthStatus(enemies2[i], enemies2[i].posX - 50, enemies2[i].posY - enemies2[i].disFromCenter - 10 );
				enemies2[i].posX -= .5 + enemies2[i].uniqSpeed;
				if(enemies2[i].firingTimer < enemies2_firing_interval){
					if(enemies2[i].firingTimer == 0){
						enemies2_bullets.push({"posX" : enemies2[i].posX, "posY" : enemies2[i].posY - 10, "yMove" : - 1});
						enemies2_bullets.push({"posX" : enemies2[i].posX - 10, "posY" : enemies2[i].posY, "yMove" : 0});
						enemies2_bullets.push({"posX" : enemies2[i].posX, "posY" : enemies2[i].posY + 10, "yMove" : 1});
					}
					enemies2[i].firingTimer ++;
				}else if(enemies2[i].firingTimer >= enemies2_firing_interval) enemies2[i].firingTimer = 0;
				if(checkClick(enemies2[i].posX, enemies2[i].posY, jetpacker)){
					enemies2.splice(i, 1);
					i -= 1;
					jetPacker.health -= 3;
				}
			}else{
				enemies2.splice(i, 1);
				i -= 1;
			}
		}
	}
	if(enemies2_bullets.length > 0){
		for(var blt = 0; blt < enemies2_bullets.length; blt++){
			if(enemies2_bullets[blt].posX < -100){
				enemies2_bullets.splice(blt, 1);
				blt -= 1;
			}else{
				enemies2_bullets[blt].posX -= 5;
				enemies2_bullets[blt].posY += enemies2_bullets[blt].yMove;
				enemyBullets.draw("still", enemies2_bullets[blt].posX, enemies2_bullets[blt].posY, 1, 0, 0, 0);
				if(checkBulletHit(enemies2_bullets, blt)){
					jetPacker.health -= 1;
					blt -= 1;
				}
			}
		}
	}
}

function drawHealthStatus(enemyObj, xPos, yPos){
	ctx.fillStyle = "#cccccc";
	ctx.fillRect(xPos, yPos, 100, 2);
	ctx.fillStyle = "red";
	ctx.fillRect(xPos, yPos, enemyObj.health * (100/enemyObj.initHealth), 2);
	ctx.fillStyle = "black";
}

function drawPlayerHealthStatus(){
	if(jetPacker.health > 0){
		ctx.fillStyle = "#cccccc";
		ctx.fillRect(jetPacker.posX - 50, jetPacker.posY - 80, 100, 3);
		ctx.fillStyle = "red";
		ctx.fillRect(jetPacker.posX - 50, jetPacker.posY - 80, jetPacker.health * (100/jetPacker.initHealth), 3);
		ctx.fillStyle = "black";
	}
}

var gameFloor = [];
var multiFloor = 1048;
function generateFloor(){
	if(gameFloor.length == 0){
		gameFloor.push({"posX" : 524, "posY" : gameHeight - 105});
		if(multiFloor < gameWidth*2){
			while(multiFloor < gameWidth*2){
				gameFloor.push({"posX" : 524 + multiFloor, "posY" : gameHeight - 105});
				multiFloor += 1048;
			}
		}
	}
	if(gameFloor.length > 0){
		for(var i = 0; i < gameFloor.length; i++){
			gameFloor[i].posX -= 2;
			floor.draw("still", gameFloor[i].posX, gameFloor[i].posY, 1, 0, 0, 0);
			if(gameFloor[i].posX + 524 < 0){
				var lastFloorX = gameFloor[gameFloor.length-1].posX;
				gameFloor.splice(i, 1);
				i -= 1;
				gameFloor.push({"posX" : 1048 + lastFloorX, "posY" : gameHeight - 105});
			}
		}
	}
}

var gameBg = [];
var multiBg = 1048;
function generateBg(){
	if(gameBg.length == 0){
		gameBg.push({"posX" : 524, "posY" : gameHeight - 250});
		if(multiBg < gameWidth*2){
			while(multiBg < gameWidth*2){
				gameBg.push({"posX" : 524 + multiBg, "posY" : gameHeight - 250});
				multiBg += 1048;
			}
		}
	}
	if(gameBg.length > 0){
		for(var i = 0; i < gameBg.length; i++){
			gameBg[i].posX -= .65;
			bg.draw("still", gameBg[i].posX, gameBg[i].posY, 1, 0, 0, 0);
			if(gameBg[i].posX + 524 < 0){
				var lastBgX = gameBg[gameBg.length-1].posX;
				gameBg.splice(i, 1);
				i -= 1;
				gameBg.push({"posX" : 1048 + lastBgX, "posY" : gameHeight - 250});
			}
		}
	}
}

function updateLevel(){
	ctx.textAlign = "right";
	ctx.fillText("Score: " + playerCurrentScore, gameWidth-20, 20);
	ctx.font = "bold 10px Arial";
	ctx.fillText("High Score: " + playerHighScore, gameWidth-20, 40);
	ctx.font = "bold 18px Arial";
	if(playerCurrentScore > playerHighScore){
		playerHighScore = playerCurrentScore;
		localStorage.setItem(title+"HighScore", playerHighScore);
	}
	if(gamePlayCounter < gamePlayCounterLimit) gamePlayCounter++;
	else{
		gamePlayCounter = 0;
		if(enemies1_aprnce_interval > 0) enemies1_aprnce_interval -= enemies1_aprnce_interval*.05;
		if(enemies2_aprnce_interval > 0) enemies2_aprnce_interval -= enemies2_aprnce_interval*.05;
	}
}

function updateShootingLine(){
	ctx.fillStyle = "red";
	ctx.fillRect(jetPacker.posX, jetPacker.posY+2, gameWidth - jetPacker.posX, .25);
	ctx.fillStyle = "black";
}

function reset(){
	jetPacker = {
		"posX" : gameWidth/2,
		"posY" : gameHeight/2,
		"moveX" : 0,
		"moveY" : 0,
		"gravity" : 0,
		"direction" : "",
		"bullets" : [],
		"weaponType" : "basic",
		"firingInterval" : 200,
		"ammo" : 0,
		"initHealth" : 20,
		"health" : 20
	}
	
	playerLevel = 1;
	playerCurrentScore = 0;
	gamePlayCounter = 0;
	gamePlayCounterLimit = 750;

	weaponUpTimeLimit = 512;
	tempWeaponUpCounter = 0;
	
	weaponUp = [];
	enemies1 = [];

	enemies1_aprnce_interval = 420;
	enemies1_counter = 0;
	enemies1_bullets = [];
	enemies1_firing_interval = 400; 

	enemies2 = [];
	enemies2_aprnce_interval = 546;
	enemies2_counter = 0;
	enemies2_bullets = [];
	enemies2_firing_interval = 250; 
}


function pause(){
	if(gameScreen == "adventure"){
		bgmusic.pause();
		stop();
		ctx.textAlign = "center";
		ctx.fillText("Paused", gameWidth/2, gameHeight/2);
		ctx.textAlign = "left";
		textButtons.draw("still", gameWidth/2, gameHeight/2 + 100, 2, 0, 0, 0);
	}
}

function resume(){
	if(gameScreen == "adventure"){
		bgmusic.play();
		loopDGame();
	}
}