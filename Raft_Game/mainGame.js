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

//snake imfo
var snakeRot = 0;
var snakeXPos = 0;
var snakeYPos = 0;

//now snake position
var mapX = 0;
var mapY = 0;

//now game speed
var gameSpeed = 0;

//game start flag
var isGameStart = false;

//item0 array,
//item1 array,
//snake body array,
//map array
let item0List = [];
let item1List = [];
let snakeList = [];
let map = [];

//game start main setting
function GameStartSetting(){
    isGameStart = true;
        
    scrollDisable();
    canvasParant.style.display = 'block';
    mainEl.style.display = 'none';
    setInterval(MainGame, gameSpeed * 100);

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
    var beforeNum = 0;
    var tmplist = [];
    
    tmplist = snakeList;
    
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
    beforeNum = afterNum * -1
    
    for(var i = 0; i < tmplist.length; i++){
        map.splice(tmplist[i], 1, 0);
    }
    
    for(var i = 0; i < snakeList.length; i++){
        if(map[snakeList[i] - afterNum] == 2){
            snakeList.push(snakeList[i] + beforeNum);
        }
        
        snakeList[i] -= afterNum ;
        map.splice(snakeList[i], 1, 1);
    }
}

//add frame(map)
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
            } else if(mapCode == 3){
                ctx.fillStyle = "blue";
            } else {
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
        var random = Math.random() * mapX;
        item0List.push(parseInt(random) - mapY);
        random = Math.random() * mapX;
        item1List.push(parseInt(random) - mapY);
        console.log(item0List);
        nowItemTime = 0;
    }
    
    for(var i = 0; i < item0List.length; i++){
        item0List[i] += parseInt(mapY);
        map.splice(item0List[i], 1, 2);
    }
    if(item0List[0] > mapY * mapX){
        item0List.shift();
    }
    
    for(var i = 0; i < item1List.length; i++){
        item1List[i] += parseInt(mapY);
        map.splice(item0List[i], 1, 3);
    }
    if(item1List[0] > mapY * mapX){
        item1List.shift();
    }
    
    console.log(item0List);
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

function scrollDisable(){
    document.getElementById("body").classname = "hidden"
}

function scrollAble(){
    document.getElementById("body").classname = "body"
}
