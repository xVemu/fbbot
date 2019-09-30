`use strict`;

const request = require('request');
const fs = require('fs');

module.exports = (fn) => {
    request({url: 'http://thedogapi.com/api/images/get', followAllRedirects: true}).pipe(fs.createWriteStream('piesek.png')).on('close', () => {
        let msg = {attachment: fs.createReadStream('piesek.png')};
        fn(msg);
        fs.unlinkSync('piesek.png');
    });
}