'use strict';
const request = require(`request-promise-native`),
    cheerio = require(`cheerio`);

module.exports = async () => {
    const $ = await request({ uri: `https://zsme.tarnow.pl`, transform: body => cheerio.load(body) });
    return $(`.article-entry`).first().text();
};