


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


function getYoutubeBlock(url, title, items){
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

function constructYoutubeBlock(shortcutName, items){
    console.log('🥦 constructYoutubeBlock');
    console.log('🥦 items', items);
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
    console.log('🍉 title', title);
    console.log('🍉 url', url);
    console.log('🍉 descriptions', descriptions);

    return getYoutubeBlock(url, title, descriptions)
}


const patternYtbRowColumSize = new RegExp(`sh-ytb-row-col([0-9]{0,2})`);

function constructYoutubeRow(shortcutName, items){
    let columnClass = 'sh-col';
    if(match = shortcutName.trim().match(patternYtbRowColumSize))
        columnClass = `sh-col${match[1]}`;

    const container = constructRow([]);
    for(const item of items){
        if (!item.innerHTML)
            continue

        let rows = [];
        for(const part of item.innerHTML.split('<br>')){
            const par = document.createElement('p');   
            par.innerHTML = part; 
            rows.push(par);
        }
        const ytbBlock = constructYoutubeBlock('sh-ytb', rows);
        container.appendChild(constructColumn(columnClass, [ytbBlock]));       
    }
    return container
}


/**
 * 
 * Row and Cols
 * 
 */


function constructRow(shortcutName, items) {
    const container = document.createElement("div");
    if (items)
        items.forEach(item => container.appendChild(item));
    container.className = 'row pr-3';
    return container
}

const columnClasses = {
    '12':   'col-12 col-md-12 col-lg-12',
    '11':   'col-12 col-md-12 col-lg-11',
    '10':   'col-12 col-md-10 col-lg-10',
    '9':    'col-12 col-md-9 col-lg-9',
    '8':    'col-12 col-md-8 col-lg-8',
    '7':    'col-12 col-md-7 col-lg-7',
    '6':    'col-12 col-md-6 col-lg-6',
    '5':    'col-12 col-md-5 col-lg-5',
    '4':    'col-12 col-md-4 col-lg-4',
    '3':    'col-12 col-md-3 col-lg-3',
    '2':    'col-12 col-md-2 col-lg-2',
    '1':    'col-12 col-md-1 col-lg-1',
};

const patternColumSize = new RegExp(`sh-col([0-9]{0,2})`);

function constructColumn(shortcutName, items){
    const container = document.createElement("div");
    container.className = 'col';

    items.forEach(item => container.appendChild(item));

    if(match = shortcutName.trim().match(patternColumSize))
        if (columnClasses.hasOwnProperty(match[1]))
            container.classList.add(...columnClasses[match[1]].split(' '));

    return container
}


/**
 * 
 *  Main Processing Below
 * 
 */

const menuShortcuts = {
    'sh-row': constructRow,
    'sh-col12': constructColumn,
    'sh-col11': constructColumn,
    'sh-col10': constructColumn,
    'sh-col9': constructColumn,
    'sh-col8': constructColumn,
    'sh-col7': constructColumn,
    'sh-col6': constructColumn,
    'sh-col5': constructColumn,
    'sh-col4': constructColumn,
    'sh-col3': constructColumn,
    'sh-col2': constructColumn,
    'sh-col1': constructColumn,
    'sh-col': constructColumn,
    'sh-ytb-row-col12': constructYoutubeRow,
    'sh-ytb-row-col11': constructYoutubeRow,
    'sh-ytb-row-col10': constructYoutubeRow,
    'sh-ytb-row-col9': constructYoutubeRow,
    'sh-ytb-row-col8': constructYoutubeRow,
    'sh-ytb-row-col7': constructYoutubeRow,
    'sh-ytb-row-col6': constructYoutubeRow,
    'sh-ytb-row-col5': constructYoutubeRow,
    'sh-ytb-row-col4': constructYoutubeRow,
    'sh-ytb-row-col3': constructYoutubeRow,
    'sh-ytb-row-col2': constructYoutubeRow,
    'sh-ytb-row-col1': constructYoutubeRow,
    'sh-ytb': constructYoutubeBlock,
};

const regexShInner = Object.keys(menuShortcuts).join('|');
const pattern = new RegExp(`/?(${regexShInner})/?`);

function recursor(parent, index, name='', level) {
    const ident = ' +\t'.repeat(level);
    console.log(ident, '🧡💛💚💙💜 Recursor index: ', index, 'name: ', name, 'level: ', level);
    const items = [];
    let targetGotoIndex = null;
    for (let idx = index; idx >= 0; idx--) {
        console.log(ident, '🥎 idx: ', idx, 'level: ', level,);
        
        if (targetGotoIndex !== null && idx > targetGotoIndex){
            console.log(ident, '🏹 Skip idx: ', idx);
            continue;
        }
            
        const rowElem = parent.children[idx].cloneNode(true);
        console.log(ident, '🥎 rowElem: ', rowElem);
        console.log(ident, '📚 items: ', items);

        const match = rowElem.innerHTML.trim().match(pattern);
        if (!match){
            items.push(rowElem);
            if (level){
                console.log(ident, '🏏 Remove elem: ', idx,  parent.children[idx].innerHTML);
                parent.children[idx].remove();

                console.log(ident, '🏏 After Remove: ', parent);
                for (let idx_p = 0; idx_p < parent.children.length; idx_p++) {
                    console.log(ident, '\t\t',  'idx_p: ', idx_p, parent.children[idx_p]);
                }
            }
        }
        else {
            console.log(ident, '🍕 match: ',  match);
            if (match[0].includes('/')) {
                console.log(ident, '🏏 Remove elem: ', idx,  parent.children[idx].innerHTML);
                parent.children[idx].remove();

                console.log(ident, '🏏 After Remove: ', parent);
                for (let idx_p = 0; idx_p < parent.children.length; idx_p++) {
                    console.log(ident, '\t\t',  'idx_p: ', idx_p, parent.children[idx_p]);
                }

                let [itemsInsideElem, newTargetIndex] = recursor(parent, idx-1, match[1], level+1 );

                if (newTargetIndex < 0)
                    newTargetIndex = 0;

                console.log(ident, '🪝 Rebuild after Recursor now idx: ', idx); 
                console.log(ident, '🛼 newTargetIndex: ', newTargetIndex, 'itemsInsideElem: ', itemsInsideElem);
                if (newTargetIndex < 0)
                    newTargetIndex = 0;
                
                const constructedElem = menuShortcuts[match[1]](match[1], itemsInsideElem);
                console.log(ident, '🥊 Replacment index: ', newTargetIndex+1, '🟫🟫🟫 constructedElem: ',  constructedElem);
                parent.children[newTargetIndex+1].replaceWith(constructedElem);
                console.log(ident, '🥊 After Replace: ', parent);
                for (let idx_p = 0; idx_p < parent.children.length; idx_p++) {
                    console.log(ident, '\t\t',  'idx_p: ', idx_p, parent.children[idx_p]);
                }

                items.push(constructedElem);
                targetGotoIndex = newTargetIndex;
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
    const [items, index] = recursor(parent, parent.children.length - 1, '', 0);

    console.log('🔮 Final');
}

processingShortcuts();




/**
 * 
 * Img Youtube Small Repalcer
 * 
 */

function imgOnload(img){
    const minDefaultImageSize = 121;
    if (img.naturalWidth < minDefaultImageSize){
        let parts = img.src.split('/');
        parts[parts.length - 1] = 'hqdefault.jpg';
        img.src = parts.join('/');
    }
}

function blinkImagesReplacer(){
    document.getElementsByClassName("markdown-body")[0].querySelectorAll('img.thumbnail-youtube')
    .forEach(img => img.onload = () => imgOnload(img));
}

blinkImagesReplacer();

