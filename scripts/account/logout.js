// Gestion de la deconnexion
function logout(){
    sessionStorage.removeItem('connectedUser');
    
    location.reload();
    
}

function attachLogoutEvent() {
    let logoutBtns = document.getElementsByClassName('logout_btn');
    for (const $logoutbtn of logoutBtns) {
        $logoutbtn.addEventListener('click', function(){
            logout()
        })
    }
}

document.addEventListener('customLoad', attachLogoutEvent()
)

document.addEventListener('DOMContentLoaded', attachLogoutEvent())