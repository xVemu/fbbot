'use strict';
const axios = require(`axios`),
    cheerio = require(`cheerio`);

module.exports = {
    name: `aktualności`,
    description: `Wysyła najnowszy wpis z zsme.tarnow.pl`,
    args: 0,
    groupOnly: false,
    aliases: [`news`, `a`],
    async execute(api, msg) {
        const response = await axios(`https://zsme.tarnow.pl`);
        const $ = cheerio.load(response.data);
        api.sendMessage($(`.article-entry`).first().text(), msg.threadID);
    }
};