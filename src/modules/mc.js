`use strict`;

const request = require('request');

module.exports = (fn) => {
    request.get('https://api.mcsrvstat.us/2/vemu.ddns.net', (err, _res, body) => {
        if(err) console.log(err);
        const {players: {online}, players: {list = undefined}} = JSON.parse(body);
        let msg = `Gracze: ${online}\n`;
        if(online > 0) {
            list.map((v) => {
                msg += ` ${v}\n`
            });
        }
        fn(msg);
    });
}