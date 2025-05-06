function logout(){
    sessionStorage.removeItem('connectedUser');
    console.log('called')
    
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

document.addEventListener('load', attachLogoutEvent()
)

document.addEventListener('DOMContentLoaded', attachLogoutEvent())