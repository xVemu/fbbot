`use strict`;

const request = require('request');

module.exports = (fn) => {
    request.get('https://api.mcsrvstat.us/2/vemu.ddns.net', (err, _res, body) => {
        if(err) console.log(err);
        const info = JSON.parse(body);
        let msg = `Gracze: ${info[`players`][`online`]}\n`;
        if(info[`players`][`online`] > 0) {
            info[`players`][`list`].map((v) => {
                msg += ` ${v}\n`
            });
        }
        fn(msg);
    });
}