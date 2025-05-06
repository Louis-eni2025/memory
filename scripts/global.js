import { hideHeader } from './header/header.js'

document.addEventListener('DOMContentLoaded', function(){
    displayContent();
    manageLink();
})

document.addEventListener('load', function(){
    manageLink();
})

function manageLink(){
    const links = document.getElementsByTagName('a');
    for (const link of links) {
        link.addEventListener('click', function(e){
            e.preventDefault();
            hideHeader()
            displayContent(this.getAttribute('href'))
        })
    }
}



function displayContent(file='game.html'){
    
    let fileFullPath = `/templates/${file}.template`;
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
    })
    .catch(error => {
        console.error("Erreur lors du chargement du fichier :", error);
    });
}

function triggerDomEvent(){
    const event = new Event('load');
    document.dispatchEvent(event);
}

export function redirect(location){
    displayContent(location)
}