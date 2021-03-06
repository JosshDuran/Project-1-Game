document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener("keydown", movementHandler)
})

var myPrimary;
var obstacles = [];
var scoreBoard;

function startGame() {
  scoreBoard = new component("20px", "Consolas", "black", 350, 20, "text");
  gameArea.start();
  // myPrimary = new component(30, 30, "red", 160, 0);
  myPrimary = new component(30, 30, "images/pop-1.png", 160, 0, "image");
  // obstacle = new component(10, 200, "purple", 300, 120);
}
// Create canvas
var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 480;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  	this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 8);
  	},
  	clear : function () {
  		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  	},
    stop : function() {
    clearInterval(this.interval);
  }
}

function everyinterval(n) {
  if ((gameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}
// Starting Primary object speifications 
function component(width, height, color, x, y, type) {
  this.type = type
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {    
  	ctx = gameArea.context;
    // if (this.type == "text") {
    //   ctx.font = this.width + " " + this.height;
    //   ctx.fillStyle = color;
    //   ctx.fillText(this.text, this.x, this.y);
    // } else {
    if (type == "image") {
      ctx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width, this.height);
    } else {
  	ctx.fillStyle = color;
  	ctx.fillRect(this.x, this.y, this.width, this.height);
    }
	}
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  // Detecting a hit
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
// Adding movement to object, updating with frames
function updateGameArea() {
  var x, y;
  for (i = 0; i < obstacles.length; i += 1) {
    if (myPrimary.crashWith(obstacles[i])) {
      gameArea.stop();
      return;
    } 
  }
   gameArea.clear();
   gameArea.frameNo += 6;
    if (gameArea.frameNo == 1 || everyinterval(150)) {
      y = gameArea.canvas.height;
      minWidth = 20;
      maxWidth = 165;
      width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
      minGap = 160;
      maxGap = 295;
      gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
      obstacles.push(new component(width, 25, "purple", 0, y));
      obstacles.push(new component(y - width - gap, 25, "purple", width + gap,y));
    }
    for (i = 0; i < obstacles.length; i += 1) {
      obstacles[i].y += -1;
      obstacles[i].update();
    }
  scoreBoard.text = "SCORE: " + gameArea.frameNo;
  scoreBoard.update();
  myPrimary.newPos();
  // myPrimary.y += 1;
  myPrimary.update();
}
//Adding control functions
function movementHandler(e) {
// LEFT=>x-=1, UP=>y-=1, RIGHT=> x+=1, DOWN=>y+=1; 
// LEFT=37, UP=38, RIGHT=39, DOWN=40, 
  switch (e.keyCode) {
    case (37):
      myPrimary.x -= 5
    break
    case (38):
      myPrimary.y -= 5
    break
    case (39):
      myPrimary.x += 5
    break
    case (40):
      myPrimary.y += 5
    break
  }
}

