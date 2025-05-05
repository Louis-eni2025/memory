export function checkRegex(input, regex) {
    return regex.test(input);
}

export function checkInputs(inputs){
    
    for(let isValid of inputs){
        if(!isValid[1]){
            return false;
        }
    }
    return true;
    
}

export function calculateAge(birthday) { 
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs); 
    let age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age>=13 ;
}

export function show(elem){
    elem.classList.remove('hidden');
}

export function hide(elem){
    elem.classList.add('hidden');
}