`use strict`;
const request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');

module.exports = (fn) => {
    // request({url: 'https://some-random-api.ml/meme', followAllRedirects: true}, (error, _response, body) => {
    //     if(error) console.log(error);
    //     const {image} = JSON.parse(body);
    //     request(image).pipe(fs.createWriteStream('meme.png')).on('close', () => {
    //         const attachments = {attachment: fs.createReadStream('meme.png')};
    //         fn(attachments);
    //         fs.unlinkSync('meme.png');
    //     });
    // });
    request('https://kwejk.pl/losowy', (error, _response, body) => {
        if(error) console.log(error);
        const $ = cheerio.load(body);
        const text = $('.box.fav.picture.full').children('.content').children("h1").text();
        const imgurl = $('.full-image').attr('src');
        if(imgurl === undefined) fn("Wystąpił błąd")
        else {
            request(imgurl).pipe(fs.createWriteStream('meme.png')).on('close', () => {
                const msg = {attachment: fs.createReadStream('meme.png'), body: text};
                fn(msg);
                fs.unlinkSync('meme.png');
            });
        }
    });
}