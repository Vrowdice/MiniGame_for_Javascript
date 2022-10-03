var mainEl = document.getElementById("mainEl");
var canvasParant = document.getElementById("canvasParant")
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var mapX = 0;
var mapY = 0;

var isGameStart = false;

function ClickMainBtn(){
    mapX = document.getElementById("inputX").value;
    mapY = document.getElementById("inputY").value;
    
    if(mapX >= 10 && mapX <= 200 &&
      mapY >= 10 && mapY <= 200){
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
    else{
        alert("Pleas enter right value...")
        return;
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

