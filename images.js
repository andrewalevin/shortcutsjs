

function blinkImagesReplacer(){
    for(const img of document.getElementsByClassName("markdown-body")[0].querySelectorAll('img')){
        img.onload = function() {
            if (img.naturalWidth < 121){
                let parts = img.src.split('/');
                parts[parts.length - 1] = 'hqdefault.jpg';
                img.src = parts.join('/');
            }
        };
    }
}

blinkImagesReplacer();