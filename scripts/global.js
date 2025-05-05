

document.addEventListener('DOMContentLoaded', function(){
    
    // CA FAIT CHIER displayContent();
})

const links = document.getElementsByTagName('a');

for (const link of links) {
    link.addEventListener('click', function(e){
        e.preventDefault();
        displayContent(this.getAttribute('href'))
        console.log(this.getAttribute('href'))
        triggerDomEvent();
    })
}

const $button = document.getElementById('testButton')


function displayContent(file='index.html'){

    file = file + '.template';
    fetch(file)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        return response.text();
    })
    .then(html => {
        let container = document.getElementById('content');
        container.innerHTML= html;

    })
    .catch(error => {
        console.error("Erreur lors du chargement du fichier :", error);
    });
}

function triggerDomEvent(){
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
    console.log('event')
}

export function redirect(){
    return;
}