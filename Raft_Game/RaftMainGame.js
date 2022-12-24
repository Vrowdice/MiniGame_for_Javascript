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

//produce item time
var item0Time = 1;
var item1Time = 15;

//max item
var maxItem = 5;

//game time and scroe, now item exists time
var gameTime = 0;
var gameScore = 0;
var nowItem0Time = 0;
var nowItem1Time = 0;

//if raft block is one, count second
var countSec = 0;

//to go imfo
var raftRot = 0;

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
    canvas.height = maxMapY * 40 + 70;
    
    snakeXPos = parseInt(maxMapX / 2);
    snakeYPos = parseInt(maxMapY / 2);
    
    ResetMap();

    raftRot = 3;
    raftList.push(snakeXPos + snakeYPos * maxMapX);
    
    interVal = setInterval(MainGame, gameSpeed * 100);
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
    MoveRaft();
    AddMap();
    Condition();
    
    gameTime++;
    gameScore++;
    
    console.log(raftList);
}

//game over
function GameOver(){
    isGameStart = false;
    clearInterval(interVal);
    
    ResetAll();
    
    canvasParant.style.display = 'none';
    mainEl.style.display = 'block';
}

//move snake
function MoveRaft(){
    var afterNum = 0;
    var beforeNum = 0;
    var tmplist = [];
    
    if(!isMove){
        gameScore += 10;
        
        tmplist = raftList;
    
        if(raftRot == 0){
            afterNum = maxMapY;
        } else if (raftRot == 1){
            afterNum = -1;
        } else if (raftRot == 2){
            afterNum = -maxMapY;
        } else if (raftRot == 3){
            afterNum = 1
        }
        beforeNum = afterNum * -1

        for(var i = 0; i < raftList.length; i++){
            if(map[raftList[i] - afterNum] == 2){
                raftList.push(raftList[i] + beforeNum);
                const found = itemList0.findIndex(element => element == raftList[i] + beforeNum);
                itemList0.splice(found, 1);
                gameScore += 200;
            } 
            if(map[raftList[i] - afterNum] == 3){
                raftList.splice(i, 1);
                const found = itemList1.findIndex(element => element == raftList[i] + beforeNum);
                itemList1.splice(found, 1);
                gameScore += 200;
            }
            if(raftRot == 1 || 3){
                if(raftList[i] % maxMapX == 0){
                    return;
                } else if(raftList[i] % maxMapX == maxMapX - 1){
                    return;
                }
            }
        }
        
        for(var i = 0; i < raftList.length; i++){
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
    
    ctx.font = "italic bold 30px Arial, sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText("Point :" + " " + gameScore, 20, 35, 200);
    
	ctx.font = "italic bold 20px Arial, sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText("Time :" + " " + gameTime, 300, 35, 200);
    
    ctx.font = "italic bold 20px Arial, sans-serif"
    ctx.fillStyle = "black";
    ctx.fillText("Count Down :" + " " + countSec, 20, 60, 200);
    
    ctx.fillRect(0 * 40 + 5, 0 * 40 + 70, 35, 35);
    ctx.fillStyle = "#BBBBBB";
    
    for(var i = 0; i < maxMapY; i++){
    	for(var o = 0; o < maxMapX; o++){
            ctx.fillRect(o * 40 + 5, i * 40 + 70, 35, 35);
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
        item0Time += 0.05;
    } else {
        var random = Math.random() * maxMapX;
        itemList0.push(parseInt(random) - maxMapY);
        nowItem0Time = 0;
    }
    
    if(item1Time > nowItem1Time){
    	nowItem1Time++;
        item1Time -= 0.1;
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
                gameScore += 100;
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
                gameScore += 100;
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

function Condition(){
    if(raftList.length <= 0){
        GameOver();
    }
    
    if(gameTime <= 30){
        return;
    }
       
    if(countSec >= 30){
        GameOver();
    }
    
    if(raftList.length <= 1){
        countSec++;
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
    beforeMap = new Array(maxMapX * maxMapY);
    beforeMap = map;
    map = new Array(maxMapX * maxMapY);
    map.fill(0);
}

function ResetAll(){
    ResetMap();
    beforeMap = new Array(maxMapX * maxMapY);
    
    gameScore = 0;
    gameTime = 0;
    countSec = 0;
    item0Time = 1;
    item1Time = 15;
    
    itemList0 = [];
    itemList1 = [];
    raftList = [];
    
    raftList.push(snakeXPos + snakeYPos * maxMapX);
}

//take the key 
window.addEventListener("keydown", e => {
  if(isGameStart){
      if(e.key == "ArrowUp"){
          raftRot = 0;
          isMove = false;
      } else if (e.key == "ArrowRight"){
          raftRot = 1;
          isMove = false;
      } else if (e.key == "ArrowDown"){
          raftRot = 2;
          isMove = false;
      } else if (e.key == "ArrowLeft"){
          raftRot = 3;
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
