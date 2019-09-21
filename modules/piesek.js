`use strict`;

const request = require('request');
const fs = require('fs');

module.exports = (fn) => {
    request({url: 'http://thedogapi.com/api/images/get', followAllRedirects: true}).pipe(fs.createWriteStream('modules/piesek.png')).on('close', () => {
        let msg = {attachment: fs.createReadStream(__dirname + '/piesek.png')};
        fn(msg);
        fs.unlinkSync(__dirname + '/piesek.png');
    });
}