var canvasHeight = 10;
var canvasWidth = 18;
var side = 50;

var bananas = [], hearts = []
var player = { x: 0, y: (canvasHeight - 2) * side, score: 0, life: 5 }
var interval = 100;// /FPS  sec
var time = 1000; //sec
var time2 = 0;
var FPS = 30;
var playerStep = 7, bananaStep = 2, heartStep = 1;
var images

var scoreElem = document.getElementById("score");
scoreElem.innerText = "Score: 0";

var lifeElem = document.getElementById("life");
lifeElem.innerText = "Life: 5"

function setup() {
    createCanvas(canvasWidth * side, canvasHeight * side);
    images = {
        minion: loadImage('image.png'),
        banana: loadImage('banana.png'),
        heart:  loadImage('heart.png')
    }

}

function draw() {
    if (player.life <= 0) {
        background("#acacac")
        fill(0);
        textSize(50);
        text("GAME OVER", 290, 250);
        return;
    }
    //frameRate(FPS)
    playerStep *= 1.0002;
    bananaStep *= 1.0001;
    time++;
    //FPS += 0.01
    interval -= 0.01;
    if (time >= interval) {
        var randX = Math.floor(Math.random() * (canvasWidth - 1) * side);
        bananas.push({ x: randX, y: 0 });
        time = 0;
        time2++;
    }
    if (time2 >= 20) {
        let randX = Math.floor(Math.random() * (canvasWidth - 1) * side);
        hearts.push({ x: randX, y: 0 });
        time2 = 0;
    }
    background("white");

    for (let banana of bananas) {
        let x = banana.x;
        let y = banana.y;
        image(images.banana, x, y, side, side);
        banana.y += bananaStep;
    }
    for (let heart of hearts) {
        let x = heart.x;
        let y = heart.y;
        image(images.heart , x , y,side,side)
        heart.y += heartStep;
    }
    // fill("#f4a742");
    // rect(player.x, player.y, side, side);
    image(images.minion, player.x, player.y, 2 * side, 2 * side)
    for (let i in bananas) {
        let banana = bananas[i];
        let x = banana.x;
        let y = banana.y;
        let bananaOX = banana.x + (side / 2);
        let bananaOY = banana.y + (side / 2);
        let playerOX = player.x + side;
        let playerOY = player.y + side;
        if (Math.abs(bananaOX - playerOX) <= side * (3 / 2) && Math.abs(bananaOY - playerOY) <= side * (3 / 2)) {
            bananas.splice(i, 1);
            player.score++;
            scoreElem.innerHTML = "Score: " + player.score;
        }
        if (y + side > canvasHeight * side) {
            bananas.splice(i, 1);
            player.life--;
            lifeElem.innerHTML = "Life: " + player.life;
        }
    }
    for (let i in hearts) {
        let heart = hearts[i];
        let x = heart.x;
        let y = heart.y;
        let heartOX = x + (side / 2);
        let heartOY = y + (side / 2);
        let playerOX = player.x + (side / 2);
        let playerOY = player.y + (side / 2);
        if (Math.abs(heartOX - playerOX) <= side && Math.abs(heartOY - playerOY) <= side) {
            hearts.splice(i, 1);
            player.life++;
            lifeElem.innerHTML = "Life: " + player.life;
        }
    }


    if (keyIsDown(RIGHT_ARROW)) {
        if (player.x >= (canvasWidth - 2) * side) return;
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

function addElement() {
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