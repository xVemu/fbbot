`use strict`;

const axios = require(`axios`).default;


module.exports = {
    name: `mc`,
    description: `Wysyła informacje o serwerze Minecraft`,
    args: 0,
    groupOnly: false,
    async execute(api, msg) {
        const {threadID, messageID} = msg;
        try {
            const { data } = await axios.get(`https://api.mcsrvstat.us/2/vemu.ddns.net`);
            if (!data.online) return api.sendMessage(`Serwer wyłączony!`, threadID, null, messageID);
            const { players: { online }, players: { list = undefined } } = data;
            let msg = `Gracze: ${online}\n`;
            if (online > 0) msg += list.reduce((acc, value) => acc += ` ${value}\n`, ``);
            return msg;
        } catch (e) {
            api.sendMessage(`Serwer wyłączony!`, threadID, null, messageID);
            console.error(e);
        }
    }
};