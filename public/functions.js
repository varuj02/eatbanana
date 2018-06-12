function GameOver() {
    background("#acacac")
    fill(0);
    textSize(50);
    text("GAME OVER", (canvasWidth - 5) * side / 2, (canvasHeight - 1) * side / 2);

    textSize(30);
    text("Click for new game", (canvasWidth - 5) * side / 2, (canvasHeight + 1) * side / 2);

}
function New_Game() {
    bananas = [], hearts = [], coins = []
    player = { x: 0, y: (canvasHeight - 2) * side, score: 0, life: 5, coin: 0 }
    interval = 150;// /FPS  sec
    time = 0; //sec
    time2 = 0;
    playerStep = 8, bananaStep = 2, heartStep = 1, coinStep = 3
    images, level, scoreimg, buy = false, right = true, pause = false, inShop = false, gameover = false;
    items = [
        { name: 'monkey', price: 0, buy: "Equiped", image: "images/monkey_R.png", HTML: '' },
        { name: 'minion', price: 10, buy: "Buy", image: "images/minion_R.png", HTML: '' },
        { name: 'mario', price: 20, buy: "Buy", image: "images/mario_R.png", HTML: '' },
        { name: 'sonic', price: 25, buy: "Buy", image: "images/sonic_R.png", HTML: '' },
        { name: 'batman', price: 40, buy: "Buy", image: "images/batman_R.png", HTML: '' },
        { name: 'deadpool', price: 50, buy: "Buy", image: "images/deadpool_R.png", HTML: '' },
        { name: 'extralife', price: 10, buy: "Buy", image: "images/heart.png", HTML: '' }
    ]
    lifeElem.innerHTML = "Life: " + player.life;
    scoreElem.innerHTML = "Score: " + player.score;
    gameover = false;
}
function drawResurces() {
    for (let banana of bananas) {
        let x = banana.x;
        let y = banana.y;
        image(scoreimg, x, y, side, side);
        banana.y += bananaStep;
    }
    for (let heart of hearts) {
        let x = heart.x;
        let y = heart.y;
        image(images.heart, x, y, side, side)
        heart.y += heartStep;
    }
    for (let coin of coins) {
        let x = coin.x;
        let y = coin.y;
        image(images.coin, x, y, side, side)
        coin.y += coinStep;
    }
}
function in_Player(bananas) {

    for (let i in bananas) {
        let banana = bananas[i];
        let x = banana.x;
        let y = banana.y;
        let bananaOX = banana.x + (side / 2);
        let bananaOY = banana.y + (side / 2);
        let playerOX = player.x + side;
        let playerOY = player.y + side;
        if (Math.abs(bananaOX - playerOX) <= side * (3 / 2) && Math.abs(bananaOY - playerOY) <= side * (3 / 2)) {
            return [true, i];
        }

    }
}
function Time() {
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
}
function Pause_Game() {
    for (let banana of bananas) {
        let x = banana.x;
        let y = banana.y;
        image(scoreimg, x, y, side, side);
    }
    for (let heart of hearts) {
        let x = heart.x;
        let y = heart.y;
        image(images.heart, x, y, side, side)
    }
    for (let coin of coins) {
        let x = coin.x;
        let y = coin.y;
        image(images.coin, x, y, side, side)
    }
    fill(0);
    textSize(50);
    text("PAUSE", (canvasWidth - 5) * side / 2, (canvasHeight - 1) * side / 2);
}
