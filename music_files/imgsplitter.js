

console.log('🐲 Img Splitter ');


const imgs = document.getElementsByTagName("img");

for (const img of imgs){
    if (img.naturalWidth > 120)
        continue;   

    console.log('🌄: ', img.src);
    console.log(img.width);
    console.log(img.clientWidth);
    console.log(img.naturalWidth);
    console.log();

    img.src = 'https://img.youtube.com/vi/nGdFHJXciAQ/hqdefault.jpg';

}



