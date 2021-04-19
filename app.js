document.addEventListener('DOMContentLoaded', createGameBoard);

const cardArray = [{
    name: "condemn",
    image: "images/condemn.png"
},{
    name: "condemn",
    image: "images/condemn.png"
},{
    name: "flurry",
    image: "images/flurry.png"
},{
    name: "flurry",
    image: "images/flurry.png"
},{
    name: "kindling",
    image: "images/kindling.png"
},{
    name: "kindling",
    image: "images/kindling.png"
},{
    name: "pride",
    image: "images/pride.png"
},{
    name: "pride",
    image: "images/pride.png"
},{
    name: "sunwell",
    image: "images/sunwell.png"
},{
    name: "sunwell",
    image: "images/sunwell.png"
},{
    name: "tavish",
    image: "images/tavish.png"
},{
    name: "tavish",
    image: "images/tavish.png"
}];

function createGameBoard() {
    let gameboard = document.getElementById('gameBoard');

    let gridContainer = document.createElement('div');
    gridContainer.className = "grid";

    for (let i = 0; i < 12; i++) {
        let item = document.createElement('div');
        item.className = 'item';

        let card = document.createElement('img');
        card.setAttribute('src','images/card_back.png');
        card.setAttribute('id', i);
        card.addEventListener('click', flipCard);

        item.appendChild(card);
        gridContainer.appendChild(item);
    }
    
    gameboard.appendChild(gridContainer);

    cardArray.sort(() => 0.5 - Math.random())
}

let cardChosen = []
let cardChosenId = []
let score = 0

function flipCard() {
    let cardId = this.getAttribute('id');
    this.setAttribute('src', cardArray[cardId].image);
    cardChosen.push(cardArray[cardId]);
    cardChosenId.push(cardId);
    if (cardChosen.length === 2) {
        document.getElementById("gameConsole").textContent = "Checking....."
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    const cards = document.querySelectorAll('img');

    let selectedCardOne = cardChosenId[0];
    let selectedCardTwo = cardChosenId[1];

    let consoleMessage = "";

    if (cardChosen[0].name === cardChosen[1].name) {
        cards[selectedCardOne].setAttribute('src', 'images/white.png');
        cards[selectedCardTwo].setAttribute('src', 'images/white.png');
        score = score + 1;
        consoleMessage = "You found a match!!"

    }else{
        cards[selectedCardOne].setAttribute('src', 'images/card_back.png');
        cards[selectedCardTwo].setAttribute('src', 'images/card_back.png');
        consoleMessage = "Sorry, try again..."
    }

    document.getElementById('gameScore').textContent = score;
    document.getElementById("gameConsole").textContent = consoleMessage;

    cardChosen = []
    cardChosenId = []

    if (score === cardArray.length / 2) {
        document.getElementById("gameConsole").textContent = 'Congratulations! You found them all.'
    }
}