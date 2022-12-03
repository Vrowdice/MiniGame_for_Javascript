//get element
const mainEl = document.getElementById("mainEl");
const canvasParant = document.getElementById("canvasParant")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//max and min map size
const maxMap = 50;
const minMap = 5;

//max and min game speed
const maxSpeed = 10;
const minSpeed = 0.1

//the time the item exists
const itemTime = 8;

//max item
var maxItem = 5;

//game time and now item exists time
var gameTime = 0;
var nowItemTime = 0;

//game score
var gameScore = 0;

//snake imfo
var snakeRot = 0;
var snakeXPos = 0;
var snakeYPos = 0;
var snakeLastRot = 0;

//now snake position
var mapX = 0;
var mapY = 0;

//now game speed
var gameSpeed = 0;

//interval func
var interVal;

//game start flag
var isGameStart = false;

//item0 array,
//snake body array,
//map array
let item0List = [];
let snakeList = [];
let map = [];

//game start main setting
function GameStartSetting(){
    isGameStart = true;
        
    gameTime = 0;
    nowItemTime = 0;
    gameScore = 0;
    
    snakeRot = 0;
    snakeXPos = 0;
    snakeYPos = 0;
    
    item0List = [];
    snakeList = [];
    map = [];
    
    canvasParant.style.display = 'block';
    mainEl.style.display = 'none';
    interVal = setInterval(MainGame, gameSpeed * 100);
    secInterVal = setInterval(Sec, 1000);

    canvas.width = mapX * 40 + 5;
    canvas.height = mapY * 40 + 45;
    
    snakeXPos = parseInt(mapX / 2);
    snakeYPos = parseInt(mapY / 2);

    ResetMap();

    snakeRot = 3;
    snakeList.push(snakeXPos + snakeYPos * mapX);
}

//if click main start button
function ClickMainBtn(){
    mapX = document.getElementById("inputX").value;
    mapY = document.getElementById("inputY").value;
    gameSpeed = document.getElementById("inputS").value;
    
    if(mapX >= minMap && mapX <= maxMap &&
      mapY >= minMap && mapY <= maxMap &&
      gameSpeed >= minSpeed && gameSpeed <= maxSpeed){
        GameStartSetting();
    }
    else{
        canvasParant.style.display = 'none';
        mainEl.style.display = 'block';
        
        alert("Pleas enter right value...");
        return;
    }
}

//game frame iterator
function MainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ResetMap();
    Setitem();
    MoveSnake();
    AddMap();
    
    gameScore++;
}

function Sec(){
    gameTime++;
}

//game over
function GameOver(){
    isGameStart = false;
    
    clearInterval(interVal);
    
    canvasParant.style.display = 'none';
    mainEl.style.display = 'block';
}

//snake moving way
function MoveSnake(){
    var afterNum = 0;
    var tmplist = [];
    
	if(snakeRot == 0){
 		--snakeYPos;
        afterNum = mapY;
    } else if (snakeRot == 1){
		++snakeXPos;
        afterNum = -1;
    } else if (snakeRot == 2){
		++snakeYPos;
        afterNum = -mapY;
    } else if (snakeRot == 3){
		--snakeXPos;
        afterNum = 1
    }
    
    if(snakeXPos < 0 || snakeYPos < 0 ||
      snakeXPos >= mapX || snakeYPos >= mapY){
        GameOver();
    }
    
    for(var i = 0; i < snakeList.length; i++){
        map.splice(snakeList[i], 1, 0);
    }
    
    tmplist = snakeList;
    tmplist.unshift(tmplist[0] - afterNum);
    tmplist.pop();
    snakeList = tmplist;
    
    console.log(snakeList);
    
    for(var i = 2; i < snakeList.length; i++){
        if(snakeList[0] == snakeList[i]){
            GameOver();
        }
    } 
   
    if(map[snakeList[0]] == 2){
        var rot = snakeList[snakeList.length - 2] - snakeList[snakeList.length - 1];
    	afterNum = rot
        
        snakeList.push(snakeList[snakeList.length - 1] + afterNum);
        gameScore += 100;
    } else if (map[snakeList[0]] == 3){
        gameScore += 200;
    }
    
    for(var i = 0; i < snakeList.length; i++){
        map.splice(snakeList[i], 1, 1);
    }
}

//add frame(map)
function AddMap(){ 
    SetMap(-1, 0, 3);
    
    ctx.beginPath();
    
    ctx.font = "italic bold 30px Arial, sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText("Point :" + " " + gameScore, 20, 35, 200);
    
	ctx.font = "italic bold 20px Arial, sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText("Time :" + " " + gameTime, 300, 35, 200);
    
    for(var i = 0; i < mapY; i++){
    	for(var o = -1; o < mapX; o++){
            ctx.fillRect(o * 40 + 5, i * 40 + 45, 35, 35);
            var mapCode = GetMap(o, i);
            
            if(mapCode == 1){
                ctx.fillStyle = "black";
            } else if(mapCode == 2) {
                ctx.fillStyle = "red";
            } else if(mapCode == 3) {
                ctx.fillStyle = "blue";
            }else {
                ctx.fillStyle = "#BBBBBB";
            }
    	}
    }
    
    ctx.closePath();
}

//item produce way
function Setitem(){
    
    if(itemTime > nowItemTime){
    	nowItemTime++;
    } else {
        if(maxItem <= item0List.length){
            var tmplist = [];
            for(var i = 1; i < item0List.length; i++){
                tmplist.push(item0List[i]);
            }
            item0List = [];
            item0List = tmplist;
    	}
        nowItemTime = 0;
        
        var random = Math.random() * mapX * mapY;
        item0List.push(random);
    }
    
    for(var i = 0; i < maxItem + 1; i++){
        map.splice(item0List[i], 1, 2);
    }
}

//set map value
function SetMap(x, y, value){
    map.splice(x + y * mapX + 1, 1, value);
}

//return map imfo
function GetMap(x, y){
    return map[x + y * mapX + 1];
}

//reset map
function ResetMap(){
    map = new Array(mapX * mapY + 1);
    map.fill(0);
}

//take the key 
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
