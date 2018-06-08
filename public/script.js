var canvasHeight = 15;
var canvasWidth = 30;
var side = 30;
var bananas = [{ x: 10, y: 127 }, { x: 190, y: 0 }]
var player = { x: 0, y: (canvasHeight - 1) * side, score: 0, life: 5 }
var interval = 100;// /FPS  sec
var time = 0; //sec
var FPS = 30;
var playerStep = 7;
var bananaStep = 2;


var scoreElem = document.getElementById("score");
scoreElem.innerText = "Score: 0";

var lifeElem = document.getElementById("life");
lifeElem.innerText = "Life: 5"

function setup() {
    createCanvas(canvasWidth * side, canvasHeight * side);

}

function draw() {
    if(player.life <=0){
        background("#acacac")
        fill(0);
        textSize(50);
        text("GAME OVER",290,250);
        return;
    }
    //frameRate(FPS)
    playerStep *= 1.0001;
    bananaStep *= 1.0001;
    time++;
    //FPS += 0.01
    interval -= 0.01;
    if (time >= interval) {
        var randX = Math.floor(Math.random() * (canvasWidth - 1) * side);
        bananas.push({ x: randX, y: 0 });
        time = 0;
    }
    background("#acacac");

    fill("yellow")
    for (var banana of bananas) {
        var x = banana.x;
        var y = banana.y;
        rect(x, y, side, side);
        banana.y += bananaStep;
    }
    fill("#f4a742");
    rect(player.x, player.y, side, side);
    for (var i in bananas) {
        var banana = bananas[i]
        var x = banana.x;
        var y = banana.y;
        if (y + side > canvasHeight * side) {
            bananas.splice(i, 1);
            player.life--;
            lifeElem.innerHTML = "Life: " + player.life;
        }
    }
    for (var i in bananas) {
        var banana = bananas[i];
        var bananaOX = banana.x + (side / 2);
        var bananaOY = banana.y + (side / 2);
        var playerOX = player.x + (side / 2);
        var playerOY = player.y + (side / 2);
        if (Math.abs(bananaOX - playerOX) <= side && Math.abs(bananaOY - playerOY) <= side) {
            bananas.splice(i, 1);
            player.score++;
            scoreElem.innerHTML = "Score: " + player.score;
        }
    }
    if (keyIsDown(RIGHT_ARROW)) {
        if (player.x >= (canvasWidth - 1) * side) return;
        player.x += playerStep;
    }
    if (keyIsDown(LEFT_ARROW)) {
        if (player.x <= 0) return;
        player.x -= playerStep;
    }
}
// setInterval(function(){
//     FPS++;
// },1000);
document.body.onload = addElement;

function addElement () { 
  // create a new div element 
  var newP = document.createElement("p"); 
  var footer = document.createElement("footer");
  // and give it some content 
  var newContent = document.createTextNode("By Varujan Margaryan"); 
  // add the text node to the newly created div
  newP.appendChild(newContent);  
  footer.appendChild(newP);  

  // add the newly created element and its content into the DOM 
  canvas.parentNode.insertBefore(footer, canvas.nextSibling);
}