import { show, hide } from '../utils/utils.js'

document.addEventListener('DOMContentLoaded', function(){

    let userConnected = sessionStorage.getItem('connectedUser');
    
    let menuDisconnected = document.getElementById('userMenu_disconnected');
    let menuConnected = document.getElementById('userMenu_connected');

    if(userConnected){
        console.log('connected');
        show(menuConnected);
        hide(menuDisconnected);
    } else {
        console.log('disconnected');
        show(menuDisconnected);
        hide(menuConnected);
    }
    
})