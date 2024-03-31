


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

function ytbCock(shortcutName, items){
    console.log('🥦 ytbCock');
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

    return ytbTagConstruction(url, title, descriptions)
}



function ytbRows3(shortcutName, items){
    console.log('🐠 ytbRows3');
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

function rowCock(shortcutName, items) {
    //console.log('🥦 rowCock');
    const container = document.createElement("div");
    for(const item of items){
        if (item == undefined)
            continue
        //console.log('🌽 item', item);
        container.appendChild(item);
    }
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


function funny(){
    console.log('🌈🌈🌈🌈🌈 Funny: ');
    
    var newElement = document.createElement("p");
    var textNode = document.createTextNode("This is a new paragraph.");
    newElement.appendChild(textNode);

    var newDiv = document.createElement("div");
    newDiv.textContent = "This is a dynamically created div!";
    newDiv.style.backgroundColor = "lightblue";
    newDiv.style.padding = "20px";
    newDiv.style.border = "1px solid black";

    newElement.appendChild(newDiv);

    console.log('🌈 newElement: ', newElement);

}



const menuShortcuts = {
    'sh-row': rowCock,
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
    'sh-ytb-rows3': ytbRows3,
    'sh-ytb': ytbCock,
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
            /*if (idx !=  targetGotoIndex + 1){
                cont
                console.log(ident, '🏏 Remove idx: ', idx);
                //parent.children[idx].innerHTML = '';
                //parent.children[idx].remove();
            }
            */
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



function test(){
    console.log('🆎 TEST');

    let container = document.createElement("div");

    let par = document.createElement("p");
    par.innerHTML = '💛 inner Paraph';
    container.appendChild(par);
    console.log('💛💛 container: ', container);

}


funny();


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

