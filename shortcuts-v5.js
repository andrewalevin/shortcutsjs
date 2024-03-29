


// Utils

function getYouTubeVideoID(url) {
    var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(youtubeRegex);
    if (match && match[1])
        return match[1]
    return null
}

function checkUrl(url){
    const pattern = /https?:\/\/[^\s<]+/;
    if (pattern.test(url))
        return true
    return false
}

function checkYoutubeUrl(url){
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?(.*&)?v=|embed\/)|youtu\.be\/)/;
    if (youtubeRegex.test(url))
        return true
    return false
}

function constructTagA(url, text=''){
    return Object.assign(document.createElement('a'), {
        href: url,
        innerHTML: text
    });
}

function constructTagImg(url){
    return Object.assign(document.createElement('img'), {
        src: url,
        loading: 'lazy'
    });
}


function tuningURL(text){
    const matches = text.match(/https?:\/\/[^\s<]+/g)
    if (matches)
        for(const url of matches)
            text = text.replace(url, constructTagA(url, url).outerHTML);        
    return text
}


function ytbTagConstruction(url, title, items){
    const container = document.createElement("div");
    
    const movieID = getYouTubeVideoID(url);
    const imgSize = 'maxresdefault';
    const imgSrc = `https://img.youtube.com/vi/${movieID}/${imgSize}.jpg`

    
    imgElem = constructTagImg(imgSrc);
    imgElem.className = 'thumbnail-youtube';

    const tagLinkElem = constructTagA(url);
    tagLinkElem.append(imgElem);

    const divImgElem = document.createElement("div");
    divImgElem.style = "background-image: url(); background-size: cover; width: 100%; aspect-ratio: 1.8 / 1;";
    divImgElem.append(tagLinkElem);

    container.append(divImgElem);


    // Title 
    const tagAtitle = constructTagA(url, title);

    const titleElem = document.createElement("h4");    
    titleElem.className = "mt-2 mb-2";
    titleElem.style = "color: initial; ";
    titleElem.append(tagAtitle);

    container.append(titleElem);


    // Other Items

    for(const item of items){
        item.innerHTML = tuningURL(item.innerHTML);
        container.appendChild(item)
    }
    container.className = 'ytb-block';
    return container
}



// Main Part


// Youtube Block

function ytbCock(items){
    const container = document.createElement("div");
    title = '';
    url = ''
    let descriptions = [];
    for(const item of items){
        if (!url)
            if (checkYoutubeUrl(item.innerHTML)){
                url = item.innerHTML;
                continue
            }
        if (!title){
            title = item.innerHTML;
            continue
        }
        descriptions.push(item);
    }

    return ytbTagConstruction(url, title, descriptions)
}



function ytbRows3(items){
    const containerRow = rowCock([]);
    for(const item of items){
        if (!item.innerHTML)
            continue

        let rows = [];
        for(const part of item.innerHTML.split('<br>')){
            const par = document.createElement('p');   
            par.innerHTML = part; 
            rows.push(par);
        }
        containerRow.appendChild(col4Cock([ytbCock(rows)]));       
    }
    return containerRow
}




// Row and Cols

function rowCock(items) {
    const container = document.createElement("div");
    items.forEach(item => container.appendChild(item));
    container.className = 'row pr-3';
    return container
}

function colCock(items){
    const container = document.createElement("div");
    items.forEach(item => container.appendChild(item));
    container.className = 'col';
    return container
}

function col12Cock(items){
    const container = document.createElement("div");
    items.forEach(item => container.appendChild(item));
    container.className = 'col col-12 col-md-12 col-lg-12  mb-5';
    return container
}

function col6Cock(items){
    const container = document.createElement("div");
    items.forEach(item => container.appendChild(item));
    container.className = 'col col-12 col-md-6 col-lg-6  mb-5';
    return container
}

function col4Cock(items){
    const container = document.createElement("div");
    items.forEach(item => container.appendChild(item));
    container.className = 'col col-12 col-md-6 col-lg-4  mb-5';
    return container
}

function col3Cock(items){
    const container = document.createElement("div");
    items.forEach(item => container.appendChild(item));
    container.className = 'col col-12 col-md-4 col-lg-3  mb-5';
    return container
}





const menuShortcuts = {
    'sh-row': rowCock,
    'sh-col-12': col12Cock,
    'sh-col-6': col6Cock,
    'sh-col-4': col4Cock,
    'sh-col-3': col3Cock,
    'sh-col': colCock,
    'sh-ytb-rows3': ytbRows3,
    'sh-ytb': ytbCock,
};

const regexShInner = Object.keys(menuShortcuts).join('|');
const pattern = new RegExp(`/?(${regexShInner})`);

function cockDivBlock(items, functionName) {
    return menuShortcuts[functionName](items);
}

function recursor0(parent, index, name='') {
    let rows = parent.children;
    const items = [];
    let targetGotoIndex = null;
    for (let idx = index; idx >= 0; idx--) {
        if (targetGotoIndex !== null && idx > targetGotoIndex)
            continue;
        
        const row = parent.children[idx].innerHTML;

        const match = row.trim().match(pattern);
        if (!match) {
            const elemPar = document.createElement("p");
            elemPar.innerHTML = row;
            items.push(elemPar);
        } else {
            if (match[0].includes('/')) {
                const [itemsGot, newTargetIndex] = recursor(parent, idx-1, match[1]);

                items.push(cockDivBlock(itemsGot, match[1]));
                targetGotoIndex = newTargetIndex;
            } else {
                return [items.reverse(), idx-1];
            }
        }
    }
    return [items.reverse(), null];
}


function recursor(parent, index, name='') {
    let rows = parent.children;
    const items = [];
    let targetGotoIndex = null;
    for (let idx = index; idx >= 0; idx--) {
        
        const row = parent.children[idx].innerHTML;

        console.log('🥎 idx: ', idx, row);


        if (targetGotoIndex !== null && idx > targetGotoIndex){
            console.log('🏹 Skip idx: ', idx);
            if (idx !=  targetGotoIndex + 1){
                console.log('🏏 Remove idx: ', idx);
                parent.children[idx].innerHTML = '';
                //parent.children[idx].remove();
            }
            continue;
        }
            
        
        

        const match = row.trim().match(pattern);
        if (!match) {
            const elemPar = document.createElement("p");
            elemPar.innerHTML = row;
            items.push(elemPar);
        } else {
            if (match[0].includes('/')) {
                const [itemsGot, newTargetIndex] = recursor(parent, idx-1, match[1]);
                const constructedElem = cockDivBlock(itemsGot, match[1]);
                
                console.log('🛼 newTargetIndex: ', newTargetIndex);
                console.log('🥊 Replace idx: ', idx);
                parent.children[newTargetIndex+1].replaceWith(constructedElem);

                items.push(constructedElem);
                targetGotoIndex = newTargetIndex;
                parent.children[idx].innerHTML = '';
            } else {
                return [items.reverse(), idx-1];
            }
        }
    }
    return [items.reverse(), null];
}


function processingShortcuts(){
    console.log('🔮 processingShortcuts: V-5 ');
    console.log('🍱 🌶 Availible Shortcuts in this version: ');
    Object.keys(menuShortcuts).forEach(item => console.log('🌶', item));
    console.log('');
    

    let parent = document.getElementsByClassName("markdown-body")[0];
    const [items, index] = recursor(parent, parent.children.length - 1);

    /*while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    */

    /*
    for(const item of items)
        parent.appendChild(item);
    */

    console.log('🔮 Final');
}

processingShortcuts();






 // Img Youtube Small Repalcer

function imgOnload(img){
    if (img.naturalWidth < 121){
        let parts = img.src.split('/');
        parts[parts.length - 1] = 'hqdefault.jpg';
        img.src = parts.join('/');
    }
}

function blinkImagesReplacer(){
    for(const img of document.getElementsByClassName("markdown-body")[0].querySelectorAll('img.thumbnail-youtube')){
        img.onload = () => imgOnload(img);
    }
}

blinkImagesReplacer();

