`use strict`;

const request = require('request'),
    fs = require('fs');

module.exports = (fn) => {
    request({url: 'https://api.thecatapi.com/v1/images/search', followAllRedirects: true}, (error, _response, body) => {
        if(error) console.log(error);
        const {url} = JSON.parse(body)[0];
        request(url).pipe(fs.createWriteStream('kitty.png')).on('close', () => {
            const attachments = {attachment: fs.createReadStream('kitty.png')};
            fn(attachments);
            fs.unlinkSync('kitty.png');
        });
    });
}