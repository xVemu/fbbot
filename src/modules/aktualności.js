'use strict';
const fetch = require(`node-fetch`),
    cheerio = require(`cheerio`);

module.exports = {
    name: `aktualności`,
    description: `Wysyła najnowszy wpis z zsme.tarnow.pl`,
    args: 0,
    groupOnly: false,
    aliases: [`news`, `a`],
    async execute(api, msg) {
        const response = await fetch(`https://zsme.tarnow.pl`);
        const $ = cheerio.load(await response.text());
        api.sendMessage($(`.article-entry`).first().text(), msg.threadID);
    }
};