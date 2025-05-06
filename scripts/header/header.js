document.addEventListener('DOMContentLoaded', function(){


    const $toggleHeader = document.getElementById('toggleHeader');
    $toggleHeader.addEventListener('click', function(){
        const $header = document.getElementById('header__nav');
        let hidden = $header.classList.contains('hidden');
        if(hidden){
            $header.classList.remove('hidden');
            $toggleHeader.classList.remove('rotate-180')
        } else {
            $header.classList.add('hidden');
            $toggleHeader.classList.add('rotate-180')
        }
    })


})
export function hideHeader(){
    const $header = document.getElementById('header__nav');
    const $toggleHeader = document.getElementById('toggleHeader');

    let hidden = $header.classList.contains('hidden');
    if(!hidden){
        $header.classList.add('hidden');
        $toggleHeader.classList.add('rotate-180')
    }
}