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
function preload(){
    //    document.body.onload = addElement;
    
    //    function addElement() {
        
        //        // create a new div element 
        //        var newP = document.createElement("p");
        //        var footer = document.createElement("footer");
        //        // and give it some content 
        //        var newContent = document.createTextNode("By Varujan Margaryan");
        //        // add the text node to the newly created div
        //        newP.appendChild(newContent);
        //        footer.appendChild(newP);
        
        //        // add the newly created element and its content into the DOM 
        //        canvas.parentNode.insertBefore(footer, canvas.nextSibling);
        
        //    }
}