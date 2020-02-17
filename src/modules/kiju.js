`use strict`;

const fs = require(`fs`).promises;

module.exports = async (message, api, split) => {
    let count = parseInt(await fs.readFile(`kiju.json`, `utf-8`));
    if (split.length == 1 && [`100003748210938`, `100038916831294`, api.getCurrentUserID()].includes(message.senderID)) {
        count += parseInt(split);
        await fs.writeFile(`kiju.json`, count);
    }
    return `Kiju był w środku ${count} razy`;
};