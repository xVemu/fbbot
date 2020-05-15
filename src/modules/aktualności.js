'use strict';
const fetch = require(`node-fetch`),
    cheerio = require(`cheerio`);

module.exports = async () => {
    const response = await fetch(`https://zsme.tarnow.pl`);
    const $ = cheerio.load(await response.text());
    return $(`.article-entry`).first().text();
};