function GameOver() {
    background("#acacac")
    fill(0);
    textSize(50);
    text("GAME OVER", 290, 250);

}
function drawResurces() {
    for (let banana of bananas) {
        let x = banana.x;
        let y = banana.y;
        image(images.ananas, x, y, side, side);
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
function buy_Minion() {
    if (player.coin >= 50) {
        player.coin -= 50;
        var playerimg = { L: images.minion_L, R: images.minion_R };
        console.log("player images changed");
    }
}