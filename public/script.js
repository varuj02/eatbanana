var canvasHeight = 10;
var canvasWidth = 18;
var side = 50;

var bananas = [], hearts = [], coins = []
var player = { x: 0, y: (canvasHeight - 2) * side, score: 0, life: 5, coin: 0 }
var interval = 100;// /FPS  sec
var time = 1000; //sec
var time2 = 0;
var FPS = 30;
var playerStep = 6, bananaStep = 2, heartStep = 1, coinStep = 3
var images, level, scoreimg, buy = false, right = true, pause = false
var items = [
    { name: 'monkey', price: 0, buy: "Equiped", HTML: '' },
    { name: 'minion', price: 10, buy: "Buy", HTML: '' },
    { name: 'mario', price: 20, buy: "Buy", HTML: '' },
    { name: 'batman', price: 50, buy: "Buy", HTML: '' }
]
var mainDiv = document.getElementById("main");

var scoreElem = document.getElementById("score");
scoreElem.innerText = "Score: 0";

var lifeElem = document.getElementById("life");
lifeElem.innerText = "Life: 5"

var coinElem = document.getElementById("coin");
coinElem.innerText = "Coins: 0";

var pauseimg = document.createElement('img');
pauseimg.setAttribute("src", "images/pause.png");
pauseimg.id = "pause";
mainDiv.appendChild(pauseimg);
pauseimg.onclick = function () {
    if (pause) pause = false
    else pause = true;
}

var shopDiv = document.getElementById("shop");

for (var item of items) {
    var itemDiv = document.createElement('div');
    itemDiv.className = "item";

    var itemH2 = document.createElement('h2');
    itemH2.className = 'itemName';
    itemH2.innerHTML = item.name;

    var itemImg = document.createElement("img");
    itemImg.setAttribute("src", "images/" + item.name + "_R.png");

    var itemPrice = document.createElement("snap");
    itemPrice.className = "price";
    itemPrice.innerHTML = "Price: " + item.price;

    var itemBuy = document.createElement("snap");
    itemBuy.className = "buy";
    itemBuy.innerHTML = item.buy;

    if (item.name == "minion") {
        var minion = itemBuy;
    }
    else if (item.name == "monkey") {
        var monkey = itemBuy;
    }
    else if (item.name == "mario") {
        var mario = itemBuy;
    }
    else if (item.name == "batman") {
        var batman = itemBuy;
    }
    itemDiv.appendChild(itemH2)
    itemDiv.appendChild(itemImg);
    itemDiv.appendChild(itemPrice);
    itemDiv.appendChild(itemBuy);
    shopDiv.appendChild(itemDiv);
    item.HTML = { h2: itemH2, img: itemImg, price: itemPrice, buy: itemBuy, div: itemDiv }
}

// 
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
        mario_L: loadImage('images/mario_L.png'),
        mario_R: loadImage('images/mario_R.png'),
        batman_L: loadImage('images/batman_L.png'),
        batman_R: loadImage('images/batman_R.png'),
        monkey_score: loadImage("images/monkey_score.png"),
        minion_score: loadImage('images/minion_score.png'),
        mario_score: loadImage("images/mario_score.png"),
        batman_score: loadImage("images/batman_score.png"),
        heart: loadImage('images/heart.png'),
        coin: loadImage('images/coin.png')
    };
    playerimg = { L: images.monkey_L, R: images.monkey_R };
    scoreimg = images.monkey_score;
}
// function buy_Item(item) {
//     if (player.coin >= item.price && item.buy == "Buy") {
//         playerimg = { L: "images/"+item.name+"_L", R: "images/"+item.name+"_R" };
//         player.coin -= 50;
//         console.log("equiped")
//         item.HTML.buy.innerText = "Equiped";
//         item.HTML.buy.style.color = "green";
//     }
// }

function draw() {
    if (pause) {
        fill(0);
        textSize(50);
        text("PAUSE", 300, 250);
        return;
    }
    if (player.life <= 0) {
        GameOver();
        return;
    }
    //frameRate(FPS)
    playerStep *= 1.0001;
    bananaStep *= 1.0001;
    heartStep *= 1.0001;
    coinStep *= 1.0001;
    time++;
    //FPS += 0.01
    interval -= 0.01;
    if (time >= interval) {
        var randX = Math.floor(Math.random() * (canvasWidth - 1) * side);
        bananas.push({ x: randX, y: 0 });
        time = 0;
        time2++;
        if (Math.random() > 0.6) {
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
//var minionSnap = document.getElementById('minion');


monkey.onclick = function () {
    item = items[0]

    if (item.buy == "Equip") {
        scoreimg = loadImage("images/" + item.name + "_score.png")
        playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
        for (let item of items) {
            if (item.buy == "Equiped") {
                item.buy = "Equip";
                item.HTML.buy.innerHTML = item.buy;
                item.HTML.buy.style.color = "red"
            }
        }
        item.buy = "Equiped";
        item.HTML.buy.innerText = item.buy;
        item.HTML.buy.style.color = "green";
    }
    else if (player.coin >= item.price && item.buy == "Buy") {
        scoreimg = loadImage("images/" + item.name + "_score.png")
        playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
        for (let item of items) {
            if (item.buy == "Equiped") {
                item.buy = "Equip";
                item.HTML.buy.innerHTML = item.buy;
                item.HTML.buy.style.color = "red"
            }
        }
        player.coin -= item.price;
        console.log("equiped")
        item.buy = "Equiped";
        item.HTML.buy.innerText = item.buy;
        item.HTML.buy.style.color = "green";
    }
}

minion.onclick = function () {
    item = items[1]

    if (item.buy == "Equip") {
        scoreimg = loadImage("images/" + item.name + "_score.png")
        playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
        for (let item of items) {
            if (item.buy == "Equiped") {
                item.buy = "Equip";
                item.HTML.buy.innerHTML = item.buy;
                item.HTML.buy.style.color = "red"
            }
        }
        item.buy = "Equiped";
        item.HTML.buy.innerText = item.buy;
        item.HTML.buy.style.color = "green";
    }
    else if (player.coin >= item.price && item.buy == "Buy") {
        scoreimg = loadImage("images/" + item.name + "_score.png")
        playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
        for (let item of items) {
            if (item.buy == "Equiped") {
                item.buy = "Equip";
                item.HTML.buy.innerHTML = item.buy;
                item.HTML.buy.style.color = "red"
            }
        }
        player.coin -= item.price;
        console.log("equiped")
        item.buy = "Equiped";
        item.HTML.buy.innerText = item.buy;
        item.HTML.buy.style.color = "green";
    }
}

mario.onclick = function () {
    item = items[2]

    if (item.buy == "Equip") {
        scoreimg = loadImage("images/" + item.name + "_score.png")
        playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
        for (let item of items) {
            if (item.buy == "Equiped") {
                item.buy = "Equip";
                item.HTML.buy.innerHTML = item.buy;
                item.HTML.buy.style.color = "red"
            }
        }
        item.buy = "Equiped";
        item.HTML.buy.innerText = item.buy;
        item.HTML.buy.style.color = "green";
    }
    else if (player.coin >= item.price && item.buy == "Buy") {
        scoreimg = loadImage("images/" + item.name + "_score.png")
        playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
        for (let item of items) {
            if (item.buy == "Equiped") {
                item.buy = "Equip";
                item.HTML.buy.innerHTML = item.buy;
                item.HTML.buy.style.color = "red"
            }
        }
        player.coin -= item.price;
        console.log("equiped")
        item.buy = "Equiped";
        item.HTML.buy.innerText = item.buy;
        item.HTML.buy.style.color = "green";
    }
}


batman.onclick = function () {
    item = items[3]

    if (item.buy == "Equip") {
        scoreimg = loadImage("images/" + item.name + "_score.png")
        playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
        for (let item of items) {
            if (item.buy == "Equiped") {
                item.buy = "Equip";
                item.HTML.buy.innerHTML = item.buy;
                item.HTML.buy.style.color = "red"
            }
        }
        item.buy = "Equiped";
        item.HTML.buy.innerText = item.buy;
        item.HTML.buy.style.color = "green";
    }
    else if (player.coin >= item.price && item.buy == "Buy") {
        scoreimg = loadImage("images/" + item.name + "_score.png")
        playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
        for (let item of items) {
            if (item.buy == "Equiped") {
                item.buy = "Equip";
                item.HTML.buy.innerHTML = item.buy;
                item.HTML.buy.style.color = "red"
            }
        }
        player.coin -= item.price;
        console.log("equiped")
        item.buy = "Equiped";
        item.HTML.buy.innerText = item.buy;
        item.HTML.buy.style.color = "green";
    }
}


