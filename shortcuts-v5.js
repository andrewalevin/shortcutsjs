
console.log('🎸🎸 shortcuts-v4.js V-4-3');


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
        console.log(' -- ', item.innerHTML);
        item.innerHTML = tuningURL(item.innerHTML);
        container.appendChild(item)
    }
    container.className = 'ytb-block';
    return container
}




// Main Part


// Youtube Block

function ytbCock(items){
    console.log('🦋 ytbCock');

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

function recursor(rows, index, name='') {
    const items = [];
    let targetGotoIndex = null;
    for (let idx = index; idx >= 0; idx--) {
        if (targetGotoIndex !== null && idx > targetGotoIndex) {
            //console.log('🏹 Skip idx: ', idx);
            continue;
        }
        const row = rows[idx].innerHTML;
        // console.log('🥎 idx: ', idx, row);

        const match = row.trim().match(pattern);
        if (!match) {
            const elemPar = document.createElement("p");
            elemPar.innerHTML = row;
            items.push(elemPar);
        } else {
            // console.log('🥭 Match: ', match, match[0], `<${match[1]}>`);
            if (match[0].includes('/')) {
                const [itemsGot, newTargetIndex] = recursor(rows, idx-1, match[1]);

                items.push(cockDivBlock(itemsGot, match[1]));
                targetGotoIndex = newTargetIndex;
            } else {
                return [items.reverse(), idx-1];
            }
        }
    }
    return [items.reverse(), null];
}



function processingShortcuts(){
    console.log('🔮 V-5 : ');

    let parent = document.getElementsByClassName("markdown-body")[0];
    const [items, index] = recursor(parent.children, parent.children.length - 1);

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    for(const item of items)
        parent.appendChild(item);

    return
    
    const elemH3 = document.createElement("h3");
    elemH3.innerHTML = '🐸 See Frog';
    parent.appendChild(elemH3);

    const elemDiv = document.createElement("div");
    elemDiv.style = 'padding-left: 4rem; padding-bottom: 15rem;';

    for(const item of items)
        elemDiv.appendChild(item);
    
    parent.appendChild(elemDiv);

    console.log('🔮 Final '); 
}

processingShortcuts();



