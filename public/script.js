var canvasHeight = 10;
var canvasWidth = 25;
var side = 50;

var bananas = [], hearts = [], coins = []
var player = { x: 0, y: (canvasHeight - 2) * side, score: 0, life: 5, coin: 1000 }
var interval = 150;// /FPS  sec
var time = 0; //sec
var time2 = 0;
var playerStep = 8, bananaStep = 2, heartStep = 1, coinStep = 3
var images, level, scoreimg, buy = false, right = true, pause = false, inShop = false,gameover=false;
var items = [
    { name: 'monkey', price: 0, buy: "Equiped", image: "images/monkey_R.png", HTML: '' },
    { name: 'minion', price: 5, buy: "Buy", image: "images/minion_R.png", HTML: '' },
    { name: 'mario', price: 10, buy: "Buy", image: "images/mario_R.png", HTML: '' },
    { name: 'sonic', price: 15, buy: "Buy", image: "images/sonic_R.png", HTML: '' },
    { name: 'batman', price: 30, buy: "Buy", image: "images/batman_R.png", HTML: '' },
   // { name: 'deadpool', price: 50, buy: "Buy", image: "images/deadpool_R.png", HTML: '' },
    { name: 'extralife', price: 10, buy: "Buy", image: "images/heart.png", HTML: '' }

]

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
        sonic_L: loadImage('images/sonic_L.png'),
        sonic_R: loadImage('images/sonic_R.png'),
        batman_L: loadImage('images/batman_L.png'),
        batman_R: loadImage('images/batman_R.png'),
        deadpool_L: loadImage('images/deadpool_L.png'),
        deadpool_R: loadImage('images/deadpool_R.png'),
        monkey_score: loadImage("images/monkey_score.png"),
        minion_score: loadImage('images/minion_score.png'),
        mario_score: loadImage("images/mario_score.png"),
        sonic_score: loadImage("images/sonic_score.png"),
        batman_score: loadImage("images/batman_score.png"),
        deadpool_score: loadImage("images/deadpool_score.png"),
        heart: loadImage('images/heart.png'),
        coin: loadImage('images/coin.png'),
        bg: loadImage('images/bg1.jpg')
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
    if (player.life <= 0) {
        gameover = true;
    }
    if (gameover) {
        GameOver();
        return;
    }
    coinElem.innerHTML = "Coins: " + player.coin;
    if (inShop) {
         background('#AED6F1')
        return
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


    //background("white");
    image(images.bg,0,0)
    //DRAW PLAYER
    if (right) {
        image(playerimg.R, player.x, player.y, 2 * side, 2 * side);
    }
    else {
        image(playerimg.L, player.x, player.y, 2 * side, 2 * side);
    }
    if (pause) {
       Pause_Game()
        return;
    }
    Time();
    drawResurces()
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
    
    //_____________________________GETING ELEMENTS_________________
    
    var headerDiv = document.getElementById("header");
    
    var scoreElem = document.getElementById("score");
    scoreElem.innerText = "Score: 0";
    
    var lifeElem = document.getElementById("life");
    lifeElem.innerText = "Life: 5"
    
    var coinElem = document.getElementById("coin");
    coinElem.innerText = "Coins: 0";
    
    
    var shopDiv = document.getElementById("shop");
    
var shopimg = document.createElement('img');
shopimg.setAttribute("src", "images/shop.png");
shopimg.id = "shop";
headerDiv.appendChild(shopimg);
shopimg.onclick = function () {
    if (inShop) {
        inShop = false;
        shopimg.setAttribute("src", "images/shop.png");
        shopDiv.setAttribute("style", "z-index:-100;");
        
    }
    else {
        inShop = true;
        shopimg.setAttribute("src", "images/home.png");
        shopDiv.setAttribute("style", "z-index:100;");
        
    }
}
var pauseimg = document.createElement('img');
pauseimg.setAttribute("src", "images/pause.png");
pauseimg.id = "pause";
headerDiv.appendChild(pauseimg);
pauseimg.onclick = function () {
    if (pause) {
        pause = false;
        pauseimg.setAttribute("src", "images/pause.png");
    }
    else {
        pause = true;
        pauseimg.setAttribute("src", "images/play.png");
    }
}



//______________CREATING ITEM ELEMENTS___________

for (var item of items) {
    var itemDiv = document.createElement('div');
    itemDiv.className = "item";
    
    var itemH2 = document.createElement('h2');
    itemH2.className = 'itemName';
    itemH2.innerHTML = item.name;
    
    var itemImg = document.createElement("img");
    itemImg.setAttribute("src",item.image);
    itemImg.className = 'item_Img';
    
    var itemPrice = document.createElement("snap");
    itemPrice.className = "price";
    itemPrice.innerHTML = "Price: " + item.price;
    
    var itemBuy = document.createElement("snap");
    itemBuy.className = "buy";
    itemBuy.innerHTML = item.buy;
    
    switch (item.name) {
        case "monkey": var monkey = itemBuy;itemBuy.style.color='green'; break;
        case "minion": var minion = itemBuy; break;
        case "mario": var mario = itemBuy; break;
        case "sonic": var sonic = itemBuy; break;
        case "batman": var batman = itemBuy; break;
        case "deadpool": var deadpool = itemBuy; break;
        case "extralife": var extralife = itemBuy; break;
        
        
        
    }
    // if (item.name == "monkey") {
        //     var monkey = itemBuy;
        // }
        // else if (item.name == "minion") {
            //     var minion = itemBuy;
            // }
        // else if (item.name == "mario") {
            //     var mario = itemBuy;
            // }
            // else if (item.name == "sonic") {
                //     var sonic = itemBuy;
                // }
                // else if (item.name == "batman") {
                    //     var batman = itemBuy;
                    // }
                    // else if (item.name == "deadpool") {
                        //     var deadpool = itemBuy;
                        // }
                        // else if (item.name == "extralife") {
            //     var extralife = itemBuy;
            // }
            itemDiv.appendChild(itemH2)
            itemDiv.appendChild(itemImg);
            itemDiv.appendChild(itemPrice);
            itemDiv.appendChild(itemBuy);
            shopDiv.appendChild(itemDiv);
            item.HTML = { h2: itemH2, img: itemImg, price: itemPrice, buy: itemBuy, div: itemDiv }
}

//footer

document.body.onload = addElement;

function addElement() {
    var canvasElem = document.getElementById("defaultCanvas0");
    canvasElem.onclick = function (){
        if(gameover){
            New_Game();
        }
    }

    // create a new div element 
    var newP = document.createElement("p");
    var footer = document.createElement("footer");
    // and give it some content 
    var newContent = document.createTextNode("By Varuj & Manch");
    // add the text node to the newly created div
    newP.appendChild(newContent);
    footer.appendChild(newP);
    
    // add the newly created element and its content into the DOM 
    canvas.parentNode.insertBefore(footer, canvas.nextSibling);
    
}


//___________________________ONCLICK FUNCTIONS________________

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
sonic.onclick = function () {
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
batman.onclick = function () {
    item = items[4]
    
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


// deadpool.onclick = function () {
//     item = items[5]
    
//     if (item.buy == "Equip") {
//         scoreimg = loadImage("images/" + item.name + "_score.png")
//         playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
//         for (let item of items) {
//             if (item.buy == "Equiped") {
//                 item.buy = "Equip";
//                 item.HTML.buy.innerHTML = item.buy;
//                 item.HTML.buy.style.color = "red"
//             }
//         }
//         item.buy = "Equiped";
//         item.HTML.buy.innerText = item.buy;
//         item.HTML.buy.style.color = "green";
//     }
//     else if (player.coin >= item.price && item.buy == "Buy") {
//         scoreimg = loadImage("images/" + item.name + "_score.png")
//         playerimg = { L: loadImage("images/" + item.name + "_L.png"), R: loadImage("images/" + item.name + "_R.png") };
//         for (let item of items) {
//             if (item.buy == "Equiped") {
//                 item.buy = "Equip";
//                 item.HTML.buy.innerHTML = item.buy;
//                 item.HTML.buy.style.color = "red"
//             }
//         }
//         player.coin -= item.price;
//         console.log("equiped")
//         item.buy = "Equiped";
//         item.HTML.buy.innerText = item.buy;
//         item.HTML.buy.style.color = "green";
//     }
// }

extralife.onclick = function () {
    item = items[5]
    
    if (player.coin >= item.price && !gameover) {
        player.life++;
        player.coin -= item.price;
        lifeElem.innerHTML = "Life: " + player.life;
        
    }
}

