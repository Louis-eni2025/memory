// Fichier principal de la page connexion.html
import { redirect } from "../global.js";

document.addEventListener('customLoad', function(){


    let title = document.getElementById('title');


    const formLogin = document.getElementById('myLoginForm');
    if(formLogin){
        formLogin.addEventListener("submit", function(e){
            e.stopPropagation();
            e.preventDefault(); 
            let formData = new FormData(this);
    
            let mail = formData.get('mail');
            let password = formData.get('password');
            let user = localStorage.getItem(mail);
            
            if(user) {
                let $user = JSON.parse(user);
                if($user.password === password) {
                    sessionStorage.setItem('connectedUser', user);
                    window.location.replace("/base.html")
                } else {
                    const errorLogin = document.getElementById("refusedMessage");
                    if(errorLogin){
                        errorLogin.remove()
                    }
                    title.insertAdjacentHTML('afterend', '<p class="text-center text-orange-400 pb-5" id="refusedMessage">Echec de l\'authentification</p>');
                }
            }
        })
    }
})