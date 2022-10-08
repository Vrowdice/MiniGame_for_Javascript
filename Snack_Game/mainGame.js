const mainEl = document.getElementById("mainEl");
const canvasParant = document.getElementById("canvasParant")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const maxMap = 50;
const minMap = 5;

const maxSpeed = 10;
const minSpeed = 0.1

var snakeRot = 0;
var snakeXPos = 0;
var snakeYPos = 0;

var mapX = 0;
var mapY = 0;

var gameSpeed = 0;

var isGameStart = false;

function ClickMainBtn(){
    mapX = document.getElementById("inputX").value;
    mapY = document.getElementById("inputY").value;
    gameSpeed = document.getElementById("inputS").value;
    
    if(mapX >= minMap && mapX <= maxMap &&
      mapY >= minMap && mapY <= maxMap &&
      gameSpeed >= minSpeed && gameSpeed <= maxSpeed){
        isGameStart = true;
        
        canvasParant.style.display = 'block';
        mainEl.style.display = 'none';
        setInterval(MainGame, gameSpeed * 100);
        
        canvas.width = mapX * 40 + 5;
        canvas.height = mapY * 40 + 5;
        snakeXPos = mapX / 2;
        snakeYPos = 0;
        
        console.log(snakeXPos);
        console.log(snakeYPos);
        
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
}

function AddMap(){
    ctx.beginPath();
    
    for(var i = 0; i < mapX; i++){
    	for(var o = 0; o < mapY; o++){
        	ctx.fillRect(i * 40 + 5, o * 40 + 5, 35, 35);
            if(i == snakeXPos && o == snakeYPos){
                ctx.fillStyle = "black";
                console.log(i + " " + o)
            } else {
                ctx.fillStyle = "#BBBBBB";
            }
    		ctx.fill();
    	}
    }
    
    ctx.closePath();
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
