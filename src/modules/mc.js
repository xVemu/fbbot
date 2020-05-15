`use strict`;

const request = require(`request-promise-native`);

module.exports = async () => {
    const json = await request({ uri: `https://api.mcsrvstat.us/2/vemu.ddns.net`, json: true });
    try {
        const { players: { online }, players: { list = undefined } } = json;
        let msg = `Gracze: ${online}\n`;
        if (online > 0) msg += list.reduce((acc, value) => acc += ` ${value}\n`, ``);
        return msg;
    } catch (e) {
        console.error(e);
        return `Serwer wyłączony!`;
    }
};