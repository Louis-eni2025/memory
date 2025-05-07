
const CARD_TO_DRAW = 6;

document.addEventListener('loadGame', function(){

    let gameArea = document.getElementById('game')
    
    if(gameArea){
        fetchCardPackAndLoadGame()
    }
    
})

document.addEventListener('keyup', event => {
    
    if (event.code === 'Space') {
        let gameContent = document.getElementById('game')
        gameContent.innerHTML = ''
        fetchCardPackAndLoadGame()
    }
})

document.addEventListener('gameReady', function(){


    let score = 0;


    let nbCardFlipped = 0;
    let card1;
    let card2;
    let cards = document.getElementsByClassName('card')



    if(cards){
        for (const card of cards) {
            card.addEventListener('click', function(){

                showCard(card);

                if(!card1){
                    card1 = card
                } else {
                    card2 = card
                }
                
                if(card1 && card2){
                    if(card1.dataset.card === card2.dataset.card){
                        score++;
                        card1 = null;
                        card2 = null;
                    } else {
                        setTimeout(function(){
                            hideCard(card1);
                            hideCard(card2);
                            card1 = null;
                            card2 = null;
                        }, "1000")
                    }
                }

                setTimeout(function(){
                    if(checkVictory()){
                        alert('victoire')
                    }
                }, "500")
                
            })
        }
    }
    
})



async function fetchCardPackAndLoadGame() {

    try {
        const response = await fetch('/data/cardPack.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        let cardPack = await response.json()

        if(!cardPack){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        loadGame(cardPack)

    } catch (error) {
      console.error('Fetch failed:', error);
    }
}

function drawCardsSuffleAndDisplay(cardPack, number){

    let cardDrawn = drawCards(cardPack, number)
    shuffleArray(cardDrawn);
    displayCards(cardDrawn)

}

function loadGame(cardPack){

    let cardToDraw = getNbOfCardToDraw()

    drawCardsSuffleAndDisplay(cardPack, cardToDraw);
}

function getNbOfCardToDraw(){
    let user = sessionStorage.getItem('connectedUser');
    if(user){
        user = JSON.parse(user);
        if(user.cardNumber){
            return user.cardNumber
        }
    }
    return CARD_TO_DRAW;
}

function drawCards(cardPack, number){
    //On divise par 2 car chaque carte du paquet correspond a 2 cartes du jeu
    number = number/2

    //Correspond au cartes a jouer
    let cardsDrawn = [];
    
    //Tirage d'une carte x2 dans le paquet
    for(let i=0; i<number;i++){
        let max = cardPack.length - 1;
        let cardToBeDrawn = Math.floor(Math.random() * (max + 1));

        //Creation d'une copie de la carte pour avoir une carte texte et une carte image
        
        
        let cardOriginal = cardPack[cardToBeDrawn]

        cardOriginal.text = true;
        cardsDrawn.push(cardOriginal)

        let cardCopy = { ...cardOriginal }
        cardCopy.text = false;
        cardsDrawn.push(cardCopy)

        cardPack.splice(cardToBeDrawn, 1);
    }
    return cardsDrawn;
}

function displayCards(cards){
    fetch("/templates/card.html.template")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP : ${response.status}`);
            }
            return response.text();
        })
        .then(template => {

            let gameArea = document.getElementById('game');
            for (const cardToPlace of cards) {
                let templateCopy = template;
                templateCopy = templateCopy.replace('{{SLUG}}', cardToPlace.slug);
                templateCopy = templateCopy.replace('{{ID}}', cardToPlace.id);
    
                let content = '';
                if(cardToPlace.text){
                    content = `<p class="text-center w-full">${cardToPlace.value}</p>`
                } else {
                    content = `<img class="object-contain h-20 w-20" src="${cardToPlace.img}">`;
                }
                templateCopy = templateCopy.replace('{{CONTENT}}', content);
                gameArea.innerHTML = gameArea.innerHTML + templateCopy
            }
            const event = new Event('gameReady');
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error("Erreur lors du chargement du fichier :", error);
        });
}

function showCard($card){
    $card.classList.add('flipped')
}

function hideCard($card){
    $card.classList.remove('flipped')
}

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function checkVictory(){
    let $cards = document.getElementsByClassName('card');
    for (const $card of $cards) {
        if(!$card.classList.contains('flipped')){
            return false;
        }
    }
    return true;
}