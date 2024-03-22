

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
    return `<div class="row mb-5">${text}</div>`;
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
    
    text  = constructParagraph(constructUrl(url, constructImg(imgSrc))).concat(text);

    return text
}


function processingShortcuts(){
    console.log('🐝 ProcessingShortcuts:');

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

    for(const block of shortcutBlocks){
        let items = [];
        const range = getRange(block[0], block[1]);
        for(const idx of range){
            if (idx!=range.slice(0)[0] && idx!=range.slice(-1)[0])
                items.push(constructCol(oneRowReplacer(parent.children[idx].innerHTML)));
            parent.children[idx].innerHTML = '';
        }
        parent.children[block[0]].innerHTML = constructRow(items.join(''));
    }

    console.log('🐝 END ProcessingShortcuts: '); 
}

processingShortcuts();

