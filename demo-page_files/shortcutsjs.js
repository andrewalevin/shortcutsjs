

console.log('🚀 START > ');


function getYouTubeVideoID(url) {
    var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(youtubeRegex);
    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}

function ytbParseRow(text){
    console.log('🚀 ytbParseRow: ', text);
    text = text.trim();
    if (!text)
        return ''
    
    const parts = text.split(' ')
    if (!parts.length)
        return ''
    
    let title = '';
    if (parts.length > 1)
        title = parts.slice(1).join(' ');
    
    const url = parts[0].match(/https?:\/\/[^\s]+/)[0]; 
    if (!url)
        return ''
        
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?(.*&)?v=|embed\/)|youtu\.be\/)/;
    if (!youtubeRegex.test(url))
        return ''

    const movieid = getYouTubeVideoID(url);

    let imgSize = 'hqdefault';
    imgSize = 'hqdefault';
    imgSize = 'maxresdefault';
    const imgSrc = `https://img.youtube.com/vi/${movieid}/${imgSize}.jpg`
    
    let html = `<p><a href="${url}"><img src=${imgSrc}></a><br><a href="${imgSrc}">${imgSrc}</a></p>`;
    
    if (title)
        html = `<h3><a href="${url}">${title}</a></h3>${html}`;
    
    html = `<div class="col-12 col-md-6 col-lg-4">\n${html}\n</div>`;
    return html
}

const tagName = 'shortcut';

function replaceShortcut(html){
    console.log('🚀 replaceShortcut: ');
    console.log('🚀 start Match');

    const regex = /<p>\[shortcut\]([\s\S]*?)\[\/shortcut\]<\/p>/g;
    // const regex = /\[shortcut\]([\s\S]*?)\[\/shortcut\]/g;
    const results = html.matchAll(regex);
    console.log('🚀 results: ', results);


    for (const result of results) {
        console.log('🚀 result: ', result);
        
        let innerResult = result[1]
        innerResult = innerResult.replace(/(<([^>]+)>)/gi, "");
        innerResult = innerResult.trim();
        
        let innerHtml = '';
        for (const item of innerResult.split('\n'))
            innerHtml = innerHtml.concat(ytbParseRow(item), '\n')
            
        innerHtml = `<div class="row g-4">\n${innerHtml}\n</div>`;
        html = html.replace(result[0], innerHtml);
    }


    console.log('🚀 End ');
    console.log(html);
    console.log('🚀 End 2');
    return html
}

const body_html = document.getElementsByClassName("markdown-body")[0];
body_html.innerHTML = replaceShortcut(body_html.innerHTML);




