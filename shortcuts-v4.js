

console.log('🎸🎸 shortcuts-v4.js');


function getYouTubeVideoID(url) {
    var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(youtubeRegex);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}

const getRange = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);




function constructRow(text){
    const elem = document.createElement("div");
    elem.className = "row mb-5";
    elem.innerHTML = text;
    return elem
}

function constructCol(text){
    return `<div class="col col-12 col-md-6 col-lg-4 mb-5">${text}</div>`;
}

function constructTitle(text){
    return `<h4 class="mt-2 mb-2">${text}</h4>`;
}

function constructUrl(url, text){
    return `<a href="${url}">${text}</a>`;
}

function constructImg(src){
    return `<img src=${src}>`;
}

function constructYoutubeThumbnail(src, url){
    return `<div style="background-image: url(); background-size: cover; width: 100%; aspect-ratio: 1.8 / 1;">
    <a href="${url}">
        <span style="color: transparent; display: inline-block;">
        <img src="${src}">
      </span>
    </a>
</div>`;
}

function constructParagraph(text){
    return `<p style="margin-bottom: 0.25rem;">${text}</p>`;
}

const urlPattern = /https?:\/\/[^\s<]+/g;

function urlReplacer(html){
    for(const url of html.match(urlPattern))
        html = html.replace(url, constructUrl(url, url));
    return html
}


function oneRowReplacer(html){
    let text = '';
    const rows = html.split('<br>');
    if (!rows)
        return html

    const url = rows[0].trim().match(urlPattern)[0]; 
    if (!url)
        return html
            
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?(.*&)?v=|embed\/)|youtu\.be\/)/;
    if (!youtubeRegex.test(url))
        return html
    
    const movieid = getYouTubeVideoID(url);
    const imgSize = 'maxresdefault';
    const imgSrc = `https://img.youtube.com/vi/${movieid}/${imgSize}.jpg`

    if (rows.length > 2){
        let descriptions = [];
        for(const row of rows.slice(2))
            descriptions.push(row.trim())

        text  = constructParagraph(urlReplacer(descriptions.join('<br>'))).concat(text);
    }
        
    
    if (rows.length > 1)
        text  = constructTitle(constructUrl(url, rows[1].trim())).concat(text);
    
    text  = constructYoutubeThumbnail(imgSrc, url).concat(text);

    return text
}

function processingShortcuts(){
    console.log('🎠 V3 - ProcessingShortcuts: -- V3');

    let parent = document.getElementsByClassName("markdown-body")[0];

    let shortcutBlocks = [];
    let starting = -1;
    for(const idx in parent.children){
        const child =  parent.children[idx];
        if (!child.innerHTML)
            continue

        if (child.innerHTML.includes('[shortcut]'))
            starting = idx;

        if (child.innerHTML.includes('[/\shortcut]'))
            shortcutBlocks.push([Number(starting), Number(idx)]);
    }

    console.log('🎠 V3 - ProcessingShortcuts: - 2');

    for(const block of shortcutBlocks){
        console.log('🥎 Block: ', block);
        let items = [];
        const range = getRange(block[0], block[1]);
        for(const idx of range){
            console.log('🥎 idx: ', idx);
            if (idx!=range.slice(0)[0] && idx!=range.slice(-1)[0])
                items.push(constructCol(oneRowReplacer(parent.children[idx].innerHTML)));
            parent.children[idx].innerHTML = '';
        }
        parent.children[block[0]].replaceWith(constructRow(items.join('')));
    }



    console.log('🐝 END ProcessingShortcuts: '); 
}

processingShortcuts();


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




const shortcutsAll = [
    'sh-row2',
    'sh-row3',
    'sh-row4',
    'sh-ytb',
];
const regexShortcuts = new RegExp(`(\\[/?)(${shortcutsAll.join('|')})\]`, "g");

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
            shortcutBlocks.push([Number(starting), Number(idx), matches[2]]);  
    }
    return shortcutBlocks
}

function shortcutFunc(itmes){
    console.log('🍱 shortcutFunc: ');
    console.log('🍱 items: ', itmes);

    const elem = document.createElement("h2");
    elem.innerHTML = 'Header';
    return elem

}

function processingShortcuts2(){
    console.log('🔮 V4 - processingShortcuts2: ');

    let parent = document.getElementsByClassName("markdown-body")[0];

    let shortcutBlocks = parsingShortcuts(parent);
    console.log('📚 shortcutBlocks: ', shortcutBlocks);

    for(const block of shortcutBlocks.reverse()){
        console.log('🥎 Block: ', block);
        let innerChilds = [];
        const range = getRange(block[0], block[1]);
        for(const idx of range.reverse()){
            console.log('🥎 idx: ', idx);
            if (idx!=block[0] && idx!=block[1])
                innerChilds.push(parent.children[idx]);
            if (idx==block[0])
                continue
            parent.children[idx].remove();
        }
        const constructedElem = shortcutFunc(innerChilds);
        parent.children[block[0]].replaceWith(constructedElem);
    }

    console.log('🔮 Fina '); 
}

processingShortcuts2();