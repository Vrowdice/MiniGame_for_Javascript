var mainEl = document.getElementById("mainEl");
var canvasParant = document.getElementById("canvasParant")
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mapX = document.getElementById("inputX");
var mapY = document.getElementById("inputY");

var isGameStart = false;

function ClickMainBtn(){
    isGameStart = true;
    if(isGameStart){
        canvasParant.style.display = 'block';
        mainEl.style.display = 'none';
        setInterval(MainGame, 10);
    }
    else{
    	canvasParant.style.display = 'none';
        mainEl.style.display = 'block';
    }
}

function MainGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(mapX, mapY, 10, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    
    ctx.closePath();
    mapX += 1;
    mapY += 1;
}

