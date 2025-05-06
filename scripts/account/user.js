// Gestion de la gestion dynamique des pages en fonction d'un user
import { show, hide } from '../utils/utils.js'

document.addEventListener('DOMContentLoaded', function(){

    const userConnected = sessionStorage.getItem('connectedUser');
    let menuDisconnected = document.getElementById('userMenu_disconnected');
    let menuConnected = document.getElementById('userMenu_connected');

    if(userConnected){
        show(menuConnected);
        hide(menuDisconnected);
    } else {
        show(menuDisconnected);
        hide(menuConnected);
    }
    
})

export function getUserNbCard(){
    const userConnected = sessionStorage.getItem('connectedUser');

    if(userConnected){
        let $user = JSON.parse(userConnected);
        if($user.cardNumber){
            return $user.cardNumber
        } else {
            return 0;
        }
    }
} 

export function setUserNbCard(number){
    const userConnected = sessionStorage.getItem('connectedUser');
    if(userConnected){
        let $user = JSON.parse(userConnected);
        $user.cardNumber = number;
        localStorage.setItem($user.mail, JSON.stringify($user))
        sessionStorage.setItem('connectedUser', JSON.stringify($user))
    }
} 