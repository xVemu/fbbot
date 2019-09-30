'use strict';
const request = require('request');
const cheerio = require('cheerio');

module.exports = (fn) => {
    request(`https://zsme.tarnow.pl`, (error, _response, html) => {
        if (error) console.log(error);
        const $ = cheerio.load(html);
        fn($(`.article-entry`).first().text());
    });
}