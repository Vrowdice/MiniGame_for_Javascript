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
var maxMapX = 0;
var maxMapY = 0;

//now game speed
var gameSpeed = 0;

//game start flag
var isGameStart = false;

//move trigger
var isMove = false;

//item array,
//snake body array,
//mapX array
//mapY array
//map Value
let itemList = [];
let raftList  = [];
let map = [];

//game start main setting
function GameStartSetting(){
    isGameStart = true;
        
    scrollDisable();
    canvasParant.style.display = 'block';
    mainEl.style.display = 'none';

    canvas.width = maxMapX * 40 + 5;
    canvas.height = maxMapY * 40 + 45;
    snakeXPos = parseInt(maxMapX / 2);
    snakeYPos = parseInt(maxMapY / 2);
    
    ResetMap();

    snakeRot = 3;
    raftList .push(snakeXPos + snakeYPos * maxMapX);
    
    setInterval(MainGame, gameSpeed * 100);
}

//if click main start button
function ClickMainBtn(){
    maxMapX = document.getElementById("inputX").value;
    maxMapY = document.getElementById("inputY").value;
    gameSpeed = document.getElementById("inputS").value;
    
    if(maxMapX >= minMap && maxMapX <= maxMap &&
      maxMapY >= minMap && maxMapY <= maxMap &&
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

//move snake
function MoveSnake(){
    var afterNum = 0;
    var beforeNum = 0;
    var tmplist = [];
    
    if(!isMove){
        tmplist = raftList;
    
        if(snakeRot == 0){
            --snakeYPos;
            afterNum = maxMapY;
        } else if (snakeRot == 1){
            ++snakeXPos;
            afterNum = -1;
        } else if (snakeRot == 2){
            ++snakeYPos;
            afterNum = -maxMapY;
        } else if (snakeRot == 3){
            --snakeXPos;
            afterNum = 1
        }
        beforeNum = afterNum * -1

        for(var i = 0; i < tmplist.length; i++){
            map.splice(tmplist[i], 1, 0);
        }

        for(var i = 0; i < raftList.length; i++){
            if(map[raftList[i] - afterNum] == 2){
                raftList.push(raftList[i] + beforeNum);
            }

            raftList[i] -= afterNum ;
        }
    }
    
    for(var i = 0; i < raftList.length; i++){
        map.splice(raftList[i], 1, 1);
    }
    
    isMove = true;
}

//add frame(map)
function AddMap(){ 
    ctx.beginPath();
    
    for(var i = 0; i < maxMapY; i++){
    	for(var o = 0; o < maxMapX; o++){
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
        var random = Math.random() * maxMapX;
        itemList.push(parseInt(random) - maxMapY);
        nowItemTime = 0;
    }
    
    for(var i = 0; i < itemList.length; i++){
        itemList[i] += parseInt(maxMapY);
        map[itemList[i]] = 2;
    }
    if(itemList[0] > maxMapY * maxMapX){
        itemList.shift();
    }
    
    console.log(itemList);
}

//set map value
function SetMap(x, y, value){
    if(x <= -1 || x > maxMapX || y <= -1 || y > maxMapY){
        return;
    }
    map[x + y * maxMapX + 1] = value;
}

//return map imfo
function GetMap(x, y){
    return map[x + y * maxMapX + 1];
}

//reset map
function ResetMap(){
    map = new Array(maxMapX * maxMapY + 1);
    map.fill(0);
}

//take the key 
window.addEventListener("keydown", e => {
  if(isGameStart){
      if(e.key == "ArrowUp"){
          snakeRot = 0;
          isMove = false;
      } else if (e.key == "ArrowRight"){
          snakeRot = 1;
          isMove = false;
      } else if (e.key == "ArrowDown"){
          snakeRot = 2;
          isMove = false;
      } else if (e.key == "ArrowLeft"){
          snakeRot = 3;
          isMove = false;
      }
  }
});

function scrollDisable(){
    document.getElementById("body").classname = "hidden"
}

function scrollAble(){
    document.getElementById("body").classname = "body"
}
