`use strict`;

const request = require('request');
const fs = require('fs');

module.exports = (fn) => {
    request({url: 'http://thecatapi.com/api/images/get', followAllRedirects: true}).pipe(fs.createWriteStream('modules/kitty.png')).on('close', () => {
        let msg = {attachment: fs.createReadStream(__dirname + '/kitty.png')};
        fn(msg);
        fs.unlinkSync(__dirname + '/kitty.png');
    });
}