const mainEl = document.getElementById("mainEl");
const canvasParant = document.getElementById("canvasParant")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const maxMap = 50;
const minMap = 5;

const maxSpeed = 10;
const minSpeed = 0.1

const maxItem = 5;

var gameTime = 0;

var snakeRot = 0;
var snakeXPos = 0;
var snakeYPos = 0;
var snakeLength = 0;

var mapX = 0;
var mapY = 0;

var gameSpeed = 0;

var isGameStart = false;

let item0List = [];
let allSnake = [];
let map = [];

function ClickMainBtn(){
    mapX = document.getElementById("inputX").value;
    mapY = document.getElementById("inputY").value;
    gameSpeed = document.getElementById("inputS").value;
    
    if(mapX >= minMap && mapX <= maxMap &&
      mapY >= minMap && mapY <= maxMap &&
      gameSpeed >= minSpeed && gameSpeed <= maxSpeed){
        isGameStart = true;
        
        scrollDisable();
        canvasParant.style.display = 'block';
        mainEl.style.display = 'none';
        setInterval(MainGame, gameSpeed * 100);
        
        canvas.width = mapX * 40 + 5;
        canvas.height = mapY * 40 + 45;
        snakeXPos = parseInt(mapX / 2);
        snakeYPos = parseInt(mapY / 2);
        snakeYPos = 0;
        
        ResetMap();
        
        snakeRot = 3;
    }
    else{
        canvasParant.style.display = 'none';
        mainEl.style.display = 'block';
        
        alert("Pleas enter right value...");
        return;
    }
}

function MainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    MoveSnake();
    AddMap();
}

function GameOver(){
    
}

function MoveSnake(){
	if(snakeRot == 0){
 		--snakeYPos;
    } else if (snakeRot == 1){
		++snakeXPos;
    } else if (snakeRot == 2){
		++snakeYPos;
    } else if (snakeRot == 3){
		--snakeXPos;
    }
    
    ResetMap();
    
    SetMap(snakeXPos, snakeYPos, 1);
    Setitem();
}

function AddMap(){ 
    
    ctx.beginPath();
    
    for(var i = 0; i < mapY; i++){
    	for(var o = 0; o < mapX; o++){
            ctx.fillRect(o * 40 + 5, i * 40 + 45, 35, 35);
            var mapCode = GetMap(o, i);
            
            if(mapCode == 1){
                ctx.fillStyle = "black";
            } else if(mapCode == 2) {
                ctx.fillStyle = "red";
            } else {
                ctx.fillStyle = "#BBBBBB";
            }
    	}
    }
    
    ctx.closePath();
}

function Setitem(){
    if(maxItem <= item0List.length){
        return;
    }
    var random = Math.random() * mapX * mapY;
    
    for(var i = 0; i < maxItem; i++){
        map.splice(random, 1, 2);
    }
}

function AddSnake(){
    if(allsnake.length >= snakeLength){
        return;
    }
    snakeLength++;
}

function SetMap(x, y, value){
    map.splice(x + y * mapX, 1, value);
}

function GetMap(x, y){
    return map[x + y * mapX];
}

function ResetMap(){
    map = new Array(mapX * mapY + 1);
    map.fill(0);
}

window.addEventListener("keydown", e => {
  if(isGameStart){
      if(e.key == "ArrowUp"){
          snakeRot = 0;
      } else if (e.key == "ArrowRight"){
          snakeRot = 1;
      } else if (e.key == "ArrowDown"){
          snakeRot = 2;
      } else if (e.key == "ArrowLeft"){
          snakeRot = 3;
      }
  }
});

function scrollDisable(){
    document.getElementById("body").classname = "hidden"
}

function scrollAble(){
    document.getElementById("body").classname = "body"
}
