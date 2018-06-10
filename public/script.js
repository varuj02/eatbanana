var canvasHeight = 10;
var canvasWidth = 18;
var side = 50;

var bananas = [], hearts = [], coins = []
var player = { x: 0, y: (canvasHeight - 2) * side, score: 0, life: 5, coin:10000 }
var interval = 100;// /FPS  sec
var time = 1000; //sec
var time2 = 0;
var FPS = 30;
var playerStep = 6, bananaStep = 2, heartStep = 1, coinStep = 3
var images, level, scoreimg,buy = false, right = true;
var scoreElem = document.getElementById("score");
scoreElem.innerText = "Score: 0";

var lifeElem = document.getElementById("life");
lifeElem.innerText = "Life: 5"

var coinElem = document.getElementById("coin");
coinElem.innerText = "Coins: 0"
// function preLoad(){
//     var  playerimg = { L: images.monkey_L, R: images.monkey_R };

// }

function setup() {
    createCanvas(canvasWidth * side, canvasHeight * side);
    images = {
        monkey_L: loadImage('images/monkey_L.png'),
        monkey_R: loadImage('images/monkey_R.png'),
        minion_L: loadImage('images/minion_L.png'),
        minion_R: loadImage('images/minion_R.png'),
        ananas: loadImage("images/ananas.png"),
        banana: loadImage('images/banana.png'),
        heart: loadImage('images/heart.png'),
        coin: loadImage('images/coin.png')
    };
    playerimg = { L: images.monkey_L, R: images.monkey_R };
    minionSnap.addEventListener("click",function(){
        if (player.coin >= 50  && minionSnap.innerText == "Buy") {
            playerimg = { L: images.minion_L, R: images.minion_R };
            console.log("player images changed");
            player.coin -= 50;
            minionSnap.innerText = "Equiped"
            minionSnap.style.color = "green"
        }
    })
}

function draw() {

    var scoreimg = images.ananas;
    if (player.life <= 0) {
        GameOver();
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
        time2++;
        if(Math.random()>0.6){
            var randX = Math.floor(Math.random() * (canvasWidth - 1) * side);
            coins.push({ x: randX, y: 0 });
        }
    }
    if (time2 >= 20) {
        let randX = Math.floor(Math.random() * (canvasWidth - 1) * side);
        hearts.push({ x: randX, y: 0 });
        time2 = 0;
    }
    
    
    //__________________LEVELS______________
    // if (player.score < 200 && !buy) {//level1
    //     playerimg = { L: images.monkey_L, R: images.monkey_R };
    //     scoreimg = images.ananas
    // }
    // if (player.score >= 200) {//LEVEL 2
    //     playerimg = { L: images.minion_L, R: images.minion_R };
    //     scoreimg = images.banana
    // }

    
    background("white");

    drawResurces()
    //DRAW PLAYER
    if (right) {
        image(playerimg.R, player.x, player.y, 2 * side, 2 * side);
    }
    else {
        image(playerimg.L, player.x, player.y, 2 * side, 2 * side);
    }
    
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
        if (Math.abs(heartOX - playerOX) <= side * (3 / 2) && Math.abs(heartOY - playerOY) <= side * (3 / 2)) {
            hearts.splice(i, 1);
            player.life++;
            lifeElem.innerHTML = "Life: " + player.life;
        }
        if (y + side > canvasHeight * side) {
            hearts.splice(i, 1);
        }
    }
    for (let i in coins) {
        let coin = coins[i];
        let x = coin.x;
        let y = coin.y;
        let coinOX = x + (side / 2);
        let coinOY = y + (side / 2);
        let playerOX = player.x + (side / 2);
        let playerOY = player.y + (side / 2);
        if (Math.abs(coinOX - playerOX) <= side * (3 / 2) && Math.abs(coinOY - playerOY) <= side * (3 / 2)) {
            coins.splice(i, 1);
            player.coin++;
            player.score++;
            scoreElem.innerHTML = "Score: " + player.score;
        }
        if (y + side > canvasHeight * side) {
            coins.splice(i, 1);
        }
    }
    coinElem.innerHTML = "Coins: " + player.coin;
    
    
    if (keyIsDown(RIGHT_ARROW)) {
        if (player.x >= (canvasWidth - 2) * side) return;
        player.x += playerStep;
        right = true;
    }
    if (keyIsDown(LEFT_ARROW)) {
        if (player.x <= 0) return;
        player.x -= playerStep;
        right = false;
    }
}
// setInterval(function(){
    //     FPS++;
    // },1000);


// function coins(){
//     playerimg = { L: images.minion_L, R: images.minion_R };
    
// }
var minionSnap = document.getElementById('minion');