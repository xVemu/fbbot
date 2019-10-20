'use strict';
const request = require(`request`),
    cheerio = require(`cheerio`);

module.exports = () => {
    return new Promise(resolve => {
        request(`https://zsme.tarnow.pl`, (error, _response, body) => {
            if (error) console.log(error);
            const $ = cheerio.load(body);
            resolve($(`.article-entry`).first().text());
        });
    });
};