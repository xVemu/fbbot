`use strict`;

const request = require('request');
const fs = require('fs');

module.exports = (fn) => {
    request({url: 'http://thecatapi.com/api/images/get', followAllRedirects: true}).pipe(fs.createWriteStream('kitty.png')).on('close', () => {
        let msg = {attachment: fs.createReadStream('kitty.png')};
        fn(msg);
        fs.unlinkSync('kitty.png');
    });
}