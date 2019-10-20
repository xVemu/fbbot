`use strict`;

const request = require(`request`);

module.exports = () => {
    return new Promise(resolve => {
        request.get(`https://api.mcsrvstat.us/2/vemu.ddns.net`, (err, _res, body) => {
            if(err) console.log(err);
            const {players: {online}, players: {list = undefined}} = JSON.parse(body);
            let msg = `Gracze: ${online}\n`;
            if(online > 0) {
                msg += list.reduce((acc, value) => acc += ` ${value}\n`, ``);
            }
            resolve(msg);
        });
    });
};