// Fichier principal de la page inscription.html
import { checkRegex, checkInputs } from "../utils/utils.js";
import { redirect } from "../global.js";

document.addEventListener('load', function(){
    const formRegister = document.getElementById('myRegisterForm');
    if(formRegister){
        formRegister.addEventListener("submit", function(e){

            e.stopPropagation();
            e.preventDefault(); 
            
            let formData = new FormData(this);
            let formValidAndSubmit = manageSubscriptionForm(formData);
    
            if(formValidAndSubmit) {
                let title = document.getElementById('title');
                
                let errorUniqueMail = document.getElementById('error_uniqueMail');
                if(errorUniqueMail){
                    errorUniqueMail.remove();
                }

                let errorUniqueName = document.getElementById('error_uniqueName');
                if(errorUniqueName){
                    errorUniqueName.remove();
                }

                let errorUnicity = false;
                if(localStorage.getItem(formData.get('mail'))){
                    errorUnicity = true;
                    displayUniquePropertyError('mail');
                }

                Object.keys(localStorage).forEach(function(key){
                    let user = localStorage.getItem(key);
                    let name = formData.get('name');
                    if(user.includes(name)){
                        errorUnicity = true;
                        displayUniquePropertyError('name');

                    }
                 });

                
        
                if (!errorUnicity) {
    
                    let user = {
                        'name': formData.get('name'),
                        'mail': formData.get('mail'),
                        'password': formData.get('password'),
                    }
        
                    localStorage.setItem(formData.get('mail'), JSON.stringify(user));
                    
                    redirect('/connexion.html')
    
                }
    
            } 
        }); 
    }



    function displayUniquePropertyError(type){
        let htmlId = `error_unique_${type}`
        let $errorUnique = document.getElementById(htmlId);
        if($errorUnique){
            $errorUnique.remove();
        }
        title.insertAdjacentHTML('afterend', `<p class="text-center text-red-400" id="${htmlId}">Cet ${type} est déjà utilisée</p>`);

    }


    const $passwordInput = document.getElementById('password');

    if($passwordInput){
        $passwordInput.addEventListener('input', function(){
            let strongness = checkPasswordStrongness(this.value);
            displayPasswordStrongness(strongness);
        })
    }


    function manageErrorDisplay(isValid, key)
    {
        let HTMLElem = document.getElementById(key);
        let error = document.getElementById(`error_${key}`);
        if(!isValid){
            HTMLElem.style.border = 'red 1px solid'
            if(!error){
                let errorHTML = `<p id="error_${key}" class="text-red-500">Le champ n'est pas valide</p>`
                HTMLElem.insertAdjacentHTML('afterend', errorHTML);
            }
            
        } else if(error){
            error.remove();
            HTMLElem.style.border = '';
        }

    }



    function manageSubscriptionForm(form)
    {

        let res = new Map();

        res.set('name', checkRegex(form.get('name'), /[a-zA-Z- ]{2,}/));
        res.set('mail', checkRegex(form.get('mail'),  /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/));
        res.set('password', checkRegex(form.get('password'), /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/));

        res.forEach(manageErrorDisplay);

        return checkInputs(res);
    }

    function checkPasswordStrongness(password){
        if (password.length > 9 && checkRegex(password, /^(?=.*\d)(?=.*[@$!%*#?&]).*$/)) {
            return "strong"
        } else if(password.length > 6 && checkRegex(password, /.*[0-9@$!%*#?&].*/) ) {
            return 'medium'
        } 
        return "weak";
    }

    function displayPasswordStrongness(strongness){

        let color = getColorFromStrongness(strongness);
        
        let strongnessDivs = document.getElementsByClassName('password_strongness');
        for (const $strongnessDiv of strongnessDivs) {
            if($strongnessDiv.id === `password_${strongness}`){
                for (let $child of $strongnessDiv.children) {
                    $child.classList.remove('!bg-slate-300');
                    $child.classList.remove('!text-slate-300');
                    $child.nodeName === 'DIV' ? $child.classList.add(`bg-${color}-500`): $child.classList.add(`text-${color}-500`);
                }
            } else {
                for (let $child of $strongnessDiv.children) {

                    $child.nodeName === 'DIV' ? $child.classList.add('!bg-slate-300'): $child.classList.add('!text-slate-300');
                }
            }
        }

    }

    function getColorFromStrongness(strongness){

        let color;
        switch (strongness) {
            case 'strong':
                color = "green";
                break;
            case 'medium':
                color = "orange";
                break;
            case 'weak':
                color = 'red';
                break;
            default:
                color = 'slate';
                break;
        }
        return color;
    }

})


