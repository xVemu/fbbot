'use strict';
const request = require('request'),
    cheerio = require('cheerio');

module.exports = (fn) => {
    request(`https://zsme.tarnow.pl`, (error, _response, body) => {
        if (error) console.log(error);
        const $ = cheerio.load(body);
        fn($(`.article-entry`).first().text());
    });
}