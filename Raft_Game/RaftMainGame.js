// 12/19 그냥 객체 한번 다시 써보자

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
const item0Time = 8;
const item1Time = 10;

//max item
var maxItem = 5;

//game time and now item exists time
var gameTime = 0;
var nowItem0Time = 0;
var nowItem1Time = 0;

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
let itemList0 = [];
let itemList1 = [];
let raftList  = [];
let map = [];
let beforeMap = [];

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

        for(var i = 0; i < raftList.length; i++){
            if(map[raftList[i] - afterNum] == 2){
                raftList.push(raftList[i] + beforeNum);
                const found = itemList0.findIndex(element => element == raftList[i] + beforeNum);
                itemList0.splice(found, 1);
            } 
            if(map[raftList[i] - afterNum] == 3){
                raftList.splice(i, 1);
                const found = itemList1.findIndex(element => element == raftList[i] + beforeNum);
                itemList1.splice(found, 1);
            }

            raftList[i] -= afterNum ;
            map.splice(raftList[i], 1, 1);
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
    
    ctx.font = "italic bold 30px Arial, sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText("Point :" + " ", 20, 35, 200);
    
	ctx.font = "italic bold 20px Arial, sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText("Time :" + " ", 300, 35, 200);
    
    
    for(var i = 0; i < maxMapY; i++){
    	for(var o = 0; o < maxMapX; o++){
            ctx.fillRect(o * 40 + 5, i * 40 + 45, 35, 35);
            var mapCode = GetMap(o, i);
            
            if(mapCode == 1){
                ctx.fillStyle = "black";
            } else if(mapCode == 2) {
                ctx.fillStyle = "blue";
            } else if(mapCode == 3){
                ctx.fillStyle = "red";
            } else {
               ctx.fillStyle = "#BBBBBB"; 
            }
    	}
    }
    
    ctx.closePath();
}

//item produce way
function Setitem(){
    if(item0Time > nowItem0Time){
    	nowItem0Time++;
    } else {
        var random = Math.random() * maxMapX;
        itemList0.push(parseInt(random) - maxMapY);
        nowItem0Time = 0;
    }
    
    if(item1Time > nowItem1Time){
    	nowItem1Time++;
    } else {
        var random = Math.random() * maxMapX;
        itemList1.push(parseInt(random) - maxMapY);
        nowItem1Time = 0;
    }
    
    for(var i = 0; i < itemList0.length; i++){
        itemList0[i] += parseInt(maxMapY);
        map[itemList0[i]] = 2;
        
        for(var o = 0; o < raftList.length; o++){
            if(raftList[o] == itemList0[i]){
                raftList.push(raftList[o] - parseInt(maxMapX));
            	itemList0.splice(i, 1);
                break;
            }
        }
    }
    
    for(var i = 0; i < itemList1.length; i++){
        itemList1[i] += parseInt(maxMapY);
        map[itemList1[i]] = 3;
        
        for(var o = 0; o < raftList.length; o++){
            if(raftList[o] == itemList1[i]){
                raftList.splice(o, 1);
            	itemList1.splice(i, 1);
                break;
            }
        }
    }
    
    if(itemList0[0] > maxMapY * maxMapX){
        itemList0.shift();
    }
    if(itemList1[0] > maxMapY * maxMapX){
        itemList1.shift();
    }
}

function CheckRaft(posValue){
    var check = false;
    
    if(beforeMap[posValue + maxMapY] == 1){
        check = true;
    }if(beforeMap[posValue - 1] == 1){
        check = true;
    }if(beforeMap[posValue - maxMapY] == 1){
        check = true;
    }if(beforeMap[posValue + 1] == 1){
        check = true;
    }
    
    return check;
}

//set map value
function SetMap(x, y, value){
    if(x <= -1 || x > maxMapX || y <= -1 || y > maxMapY){
        return;
    }
    map.splice(x + y * mapX + 1, 1, value);
}

//return map imfo
function GetMap(x, y){
    return map[x + y * maxMapX + 1];
}

//reset map
function ResetMap(){
    beforeMap = new Array(maxMapX * maxMapY + 1);
    beforeMap = map;
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

function IsExist(element)  {
  if(element == 2)  {
    return true;
  }
}
