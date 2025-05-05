
document.addEventListener('DOMContentLoaded', function(){


    let params = new URLSearchParams(document.location.search);
    let success = params.get("success")
    let connected = params.get('connected')
    let title = document.getElementById('title');

    if(connected){
        let connected = document.getElementById('connected');
        if(!connected){
            title.insertAdjacentHTML('afterend', '<p class="text-center text-green-400 pb-5" id="connected">Plz connect</p>');
        }
    }

    if(success){
        let successMessage = document.getElementById('successMessage');
        if(!successMessage){
            title.insertAdjacentHTML('afterend', '<p class="text-center text-green-400 pb-5" id="successMessage">Votre compte a bien été crée</p>');
        }
    }

    const formLogin = document.getElementById('myLoginForm');

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
                location.assign('/index.html')
            } else {
                const errorLogin = document.getElementById("refusedMessage");
                if(errorLogin){
                    errorLogin.remove()
                }
                title.insertAdjacentHTML('afterend', '<p class="text-center text-orange-400 pb-5" id="refusedMessage">Echec de l\'authentification</p>');
            }
        }
        
    })
})