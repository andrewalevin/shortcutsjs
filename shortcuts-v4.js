
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

const getRange = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

// Main Part

function constructTagA(url, text=''){
    const elem = document.createElement("a");
    elem.href = url;
    elem.innerHTML = text;
    return elem
}


function constructTagImg(url){
    const elem = document.createElement("img");
    elem.src = url;
    elem.loading = "lazy";
    return elem
}


const menuShortcuts = {
    'sh-row1': shortcutRow1,
    'sh-row2': shortcutRow2,
    'sh-row3': shortcutRow3,
    'sh-row4': shortcutRow4,
    'sh-ytb': shortcutYtb,
    'sh-row-ytb': shortcutRowYtb,
};

const regexShInner = Object.keys(menuShortcuts).join('|');

const regexShortcuts = new RegExp(`(\\[/?)(${regexShInner})\]`, "g");

function parsingShortcuts(htmlElement){
    let shortcutBlocks = [];
    let starting = -1;
    for(const idx in htmlElement.children){
        const child =  htmlElement.children[idx];
        if (!child.innerHTML)
            continue

        let matches = child.innerHTML.matchAll(regexShortcuts);
        matches = Array.from(matches);
        if (!matches.length)
            continue
        matches = matches[0];

        if (matches[1] == '[')
            starting = idx;
            
        if (matches[1] == '[\/' )
            shortcutBlocks.push({'startIndex': Number(starting), 'endIndex': Number(idx), 'name': matches[2]});  
    }
    return shortcutBlocks
}

function processingShortcuts(){
    console.log('🔮 V4 - processingShortcuts2: ');

    let parent = document.getElementsByClassName("markdown-body")[0];

    let shortcutBlocks = parsingShortcuts(parent);
    console.log('📚 shortcutBlocks: ', shortcutBlocks);

    for(const block of shortcutBlocks.reverse()){
        let innerChilds = [];
        const range = getRange(block.startIndex, block.endIndex);
        for(const idx of range.reverse()){
            if (idx!=block.startIndex && idx!=block.endIndex)
                innerChilds.push(parent.children[idx]);
            if (idx==block.startIndex)
                continue
            parent.children[idx].remove();
        }
        if(! block.name in menuShortcuts)
            continue
        
        const constructedElem = menuShortcuts[block.name](innerChilds);
        parent.children[block.startIndex].replaceWith(constructedElem);
    }

    console.log('🔮 Final '); 
}


// Shortcut Functions

function shortcutCol(childs, size=1){
    const elem = document.createElement("div");
    elem.className = "col col-12 col-md-12 col-lg-12  mb-5";
    if(size==2)
        elem.className = "col col-12 col-md-6 col-lg-6  mb-5";
    if(size==3)
        elem.className = "col col-12 col-md-6 col-lg-4  mb-5";
    if(size==4)
        elem.className = "col col-12 col-md-4 col-lg-3  mb-5";

    for(const child of childs.reverse())
        elem.append(child)
    return elem
}

function shortcutRow1(childs){
    const elem = document.createElement("div");
    elem.className = "row mb-5";
    for(const child of childs.reverse())
        elem.append(shortcutCol([child], size=1))
    return elem
}

function shortcutRow2(childs){
    const elem = document.createElement("div");
    elem.className = "row mb-5";
    for(const child of childs.reverse())
        elem.append(shortcutCol([child], size=2))
    return elem
}

function shortcutRow3(childs){
    const elem = document.createElement("div");
    elem.className = "row mb-5";
    for(const child of childs.reverse())
        elem.append(shortcutCol([child], size=3))
    return elem
}

function shortcutRow4(childs){
    const elem = document.createElement("div");
    elem.className = "row mb-5";
    for(const child of childs.reverse())
        elem.append(shortcutCol([child], size=4))
    return elem
}


function tuningURL(text){
    for(const url of text.match(/https?:\/\/[^\s<]+/g))
        text = text.replace(url, constructTagA(url, url).outerHTML);        
    return text
}

function shortcutYtb(childs){
    const elem = document.createElement("div");
    const paragraph = childs[0];

    const rows = paragraph.innerHTML.split('<br>');
    if (!rows.length)
        return elem

    const url = rows[0].trim();
    if (!checkUrl(url))
        return elem

    if (!checkYoutubeUrl(url))
        return elem

    const movieID = getYouTubeVideoID(url);
    const imgSize = 'maxresdefault';
    const imgSrc = `https://img.youtube.com/vi/${movieID}/${imgSize}.jpg`

    const elemImg = document.createElement("div");
    elemImg.style = "background-image: url(); background-size: cover; width: 100%; aspect-ratio: 1.8 / 1;";

    const tagA = constructTagA(url);
    tagImg = constructTagImg(imgSrc);
    tagImg.className = 'thumbnail-youtube';
    tagA.append(tagImg);

    elemImg.append(tagA);
    elem.append(elemImg);


    if (rows.length < 2)
        return elem

    const title = rows[1].trim()
    const titleElem = document.createElement("h4");    
    titleElem.className = "mt-2 mb-2";

    const tagAtitle = constructTagA(url, title);
    tagAtitle.style = "color: initial; ";
    titleElem.append(tagAtitle);

    elem.append(titleElem);


    if (rows.length < 3)
        return elem   

    const descriptionElem = document.createElement("p");
    descriptionElem.innerHTML = tuningURL(rows.slice(2).join('<br>'));
    elem.append(descriptionElem);

    return elem
}


function shortcutRowYtb(childs){
    console.log('🍉 shortcutRow3Ytb: ');

    const elem = document.createElement("div");
    elem.className = "row mb-5";
    for(const child of childs.reverse())
        elem.append(shortcutCol([shortcutYtb([child])], size=3))
    return elem
}

processingShortcuts();


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

