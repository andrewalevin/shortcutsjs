
var html = `
<p>Starting</p>

<p>[shortcut-rows-to-columns]</p>

<p>https://www.youtube.com/watch?v=DknPnrAhzgk</p>

<p>https://www.youtube.com/watch?v=zzCfBdSpmqc</p>

<p>[/shortcut-rows-to-columns]</p>

<p>Additions</p>

<p>[shortcut-rows-to-columns]</p>

<p>https://www.youtube.com/watch?v=LihIX5CmxRw</p>

<p>https://www.youtube.com/watch?v=IteHHGUy73E</p>

<p>[/shortcut-rows-to-columns]</p>

<p>Final</p>

`;

function getYouTubeVideoID(url) {
    // Regular expression to match YouTube video IDs
    var youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    var match = url.match(youtubeRegex);
    if (match && match[1]) {
        return match[1]; // Return the video ID
    } else {
        return null; // Return null if no match found
    }
}


function ytbShortcut(text){
    if (!text.trim())
        return ''

    text = text.trim();
    
    let url = text.match(/https?:\/\/[^\s]+/)[0]; 
    if (!url)
        return ''
        
    var youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?(.*&)?v=|embed\/)|youtu\.be\/)/;

    if (!youtubeRegex.test(url))
        return ''

    let movieID = getYouTubeVideoID(url);
    const imgSize = 'sddefault';
    
    let img = `https://img.youtube.com/vi/${movieID}/${imgSize}.jpg`
    
    text = '💎 '.concat(img);
    return text
}

function replaceShortcut(html){
    console.log('🚀 findKey: ');
    const regex = /<p>\[shortcut-rows-to-columns\]([\s\S]*?)\[\/shortcut-rows-to-columns\]<\/p>/g;
    
    let out = '';
    
    for (result of html.matchAll(regex)) {
        
        let innerResult = result[1]
        innerResult = innerResult.replace(/(<([^>]+)>)/gi, "");
        innerResult = innerResult.trim();
        
        let innerText = '';
        for (const item of innerResult.split('\n'))
            innerText = innerText.concat(ytbShortcut(item), '\n')
    
        html = html.replace(result[0], innerText);

    }
    console.log('🚀 findKey - end: ');
    
    return html
}


const html2 = replaceShortcut(html);

console.log('🥦 After: ');
console.log(html2);
































