import { hideHeader } from './header/header.js'

document.addEventListener('DOMContentLoaded', function(){


    displayContent();
    manageLink();
})


function manageLink(){
    const links = document.getElementsByTagName('a');
    for (const link of links) {
        if(!link.dataset.event){
            link.addEventListener('click', function(e){
                e.preventDefault();
                link.dataset.event = true;
                hideHeader()
                displayContent(this.getAttribute('href'))
            })
        } else {
            console.log(link)
        }
        
    }
}



function displayContent(file='/index.html'){
    console.log(file)
    let fileFullPath = `/templates${file}.template`;
    fetch(fileFullPath)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        let container = document.getElementById('content');
        container.innerHTML= html;
        triggerDomEvent();
        if(file === '/game.html'){
            triggerDomEvent('loadGame')
        }
    })
    .catch(error => {
        console.error("Erreur lors du chargement du fichier :", error);
    });
}

function triggerDomEvent(eventName = 'customLoad'){
    const event = new Event(eventName);
    document.dispatchEvent(event);
}

export function redirect(location){
    displayContent(location)
}
