var myPrimary;
var obstacle;

function startGame() {
  gameArea.start();
  myPrimary = new component(30, 30, "red", 160, 0);
  obstacle = new component(10, 200, "purple", 300, 120);
}
// Create canvas
var gameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
    this.canvas.width = 480;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  	this.interval = setInterval(updateGameArea, 20);
  	},
  	clear : function () {
  		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  	}
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
}
// Adding movement to my primary object
function updateGameArea() {
	gameArea.clear();
  obstacle.update();
  myPrimary.newPos();
	myPrimary.y += 1;
	myPrimary.update();
}

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