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

/howler sounds
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
