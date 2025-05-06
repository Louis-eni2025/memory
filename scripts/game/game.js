/*

clic carte
si carte 1
 retourne et enregistre la carte
si carte 2
 retourne et compare carte 2
si carte 1 == carte 2
 return
sinon
 retourne carte 1 && carte 2

*/

document.addEventListener('load', function(){
    let nbCardFlipped = 0;
    let cardFlipped;
    let cards = document.getElementsByClassName('card')
    if(cards){
        for (const card of cards) {
            card.addEventListener('click', function(){
                cardFlipped = this.dataset.card;
                console.log(cardFlipped);
                if(nbCardFlipped < 1){
                    let img = card.firstChild
                    img.classList.remove('hidden')
                    console.log(img);
                    nbCardFlipped++;
                } else {
                    nbCardFlipped =0
                }
                console.log(nbCardFlipped)
            })
        }
    }
    
})


function flipCard($card, isFirst){

}

