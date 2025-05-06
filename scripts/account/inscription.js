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
                let errorUnique = document.getElementById('error_unique');
                if(errorUnique){
                    errorUnique.remove();
                }
                if(localStorage.getItem(formData.get('mail'))){
                    if(!errorUnique){
                        title.insertAdjacentHTML('afterend', '<p class="text-center text-red-400" id="error_unique">Cet email est déjà utilisée</p>');
                    }
                } else {
    
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

    const $passwordInput = document.getElementById('password');

    if($passwordInput){
        $passwordInput.addEventListener('input', function(){
            let strongness = checkPasswordStrongness(this.value);
            console.log(strongness);
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

    

})


