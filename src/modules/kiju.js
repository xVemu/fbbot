`use strict`;

const fs = require(`fs`).promises;

module.exports = async (message, api, split) => {
    let count = parseInt(await fs.readFile(`kiju.json`, `utf-8`));
    if (split.length == 1 && message.senderID in [`100003748210938` || `100038916831294` || api.getCurrentUserID()]) {
        count += parseInt(split);
        await fs.writeFile(`kiju.json`, count);
    }
    return `Kiju był w środku ${count} razy`;
};