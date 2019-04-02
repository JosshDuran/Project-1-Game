var myPrimary;
var obstacles = [];

function startGame() {
  gameArea.start();
  myPrimary = new component(30, 30, "red", 160, 0);
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
    this.interval = setInterval(updateGameArea, 20);
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
function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {    
  	ctx = gameArea.context;
  	ctx.fillStyle = color;
  	ctx.fillRect(this.x, this.y, this.width, this.height);
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
    maxWidth = 200;
    width = Math.floor(Math.random()*(maxWidth-minWidth+1)+minWidth);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    obstacles.push(new component(width, 10, "purple", 0, y));
    obstacles.push(new component(y - width - gap, 10, "purple", width + gap,y));
  }
  for (i = 0; i < obstacles.length; i += 1) {
    obstacles[i].y += -1;
    obstacles[i].update();
  }
  myPrimary.newPos();
  // myPrimary.y += 1;
  myPrimary.update();
}
//   gameArea.clear();
//   gameArea.frameNo += 1;
//   if (gameArea.frameNo == 1 || everyinterval(150)) {
//     x = gameArea.canvas.width;
//     minHeight = 20;
//     maxHeight = 200;
//     height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
//     minGap = 50;
//     maxGap = 200;
//     gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
//     obstacles.push(new component(10, height, "purple", x, 0));
//     obstacles.push(new component(10, x - height - gap, "purple", x, height + gap));
//   }
//   for (i = 0; i < obstacles.length; i += 1) {
//     obstacles[i].x += -1;
//     obstacles[i].update();
//   }
//   myPrimary.newPos();
// 	myPrimary.y += 1;
// 	myPrimary.update();
// }
//Adding control functions
function stop(){
  myPrimary.speedY -= 1;
}

function moveleft(){
  myPrimary.speedX -= 1;
}

function moveright(){
  myPrimary.speedX += 1;
}

function clearmove(){
  myPrimary.speedX = 0;
  myPrimary.speedY = 0;
}