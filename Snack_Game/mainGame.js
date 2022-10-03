const mainEl = document.getElementById("mainEl");
const canvasParant = document.getElementById("canvasParant")
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const maxMap = 50;
const minMap = 5;

const maxSpeed = 10;
const minSpeed = 0.1

var mapX = 0;
var mapY = 0;

var gameSpeed = 0;

var map = new Array();

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
        
        canvas.width = mapX * 40 + 5
        canvas.height = mapY * 40 + 5
        
        for (var i = 0; i < mapX; i++) {
    		arr[i] = new Array(2);
        }
    }
    else{
        canvasParant.style.display = 'none';
        mainEl.style.display = 'block';
        
        alert("Pleas enter right value...")
        return;
    }
}

function MainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    
    AddMap();
    
    ctx.closePath();
}

function AddMap(){
    for(var i = 0; i < mapX; i++){
    	for(var o = 0; o < mapY; o++){
        	ctx.fillRect(5 + i * 40, 5 + o * 40, 35, 35);
    		ctx.fillStyle = "#BBBBBB";
    		ctx.fill();
            
            console.debug(o);
    	}
    }
}

