// Fichier principal de la page account.html
import { getUserNbCard, setUserNbCard } from "./user.js";

document.addEventListener('load', function(){
    let user = sessionStorage.getItem('connectedUser');
    if(user){
        user = JSON.parse(user);
        const nameField = document.getElementById('display_name');
        if(nameField) {
            nameField.value = user.name
        }
        const mailField = document.getElementById('display_mail');
        if(mailField){
            mailField.value = user.mail
        }
    }

    let $userCardNumberField = document.getElementById('user_cardNb');
    if($userCardNumberField){
        $userCardNumberField.value = getUserNbCard();

        let btnSubmitUserCardNumber = document.getElementById("submitUserCardNumber");
        btnSubmitUserCardNumber.addEventListener('click', function(){
            setUserNbCard($userCardNumberField.value);
        })
    }
})
