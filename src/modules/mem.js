`use strict`;
const request = require('request'),
    fs = require('fs');

module.exports = (fn) => {
    request({url: 'https://some-random-api.ml/meme', followAllRedirects: true}, (error, _response, body) => {
        if(error) console.log(error);
        const {image} = JSON.parse(body);
        request(image).pipe(fs.createWriteStream('meme.png')).on('close', () => {
            const attachments = {attachment: fs.createReadStream('meme.png')};
            fn(attachments);
            fs.unlinkSync('meme.png');
        });
    });
}