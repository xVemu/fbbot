`use strict`;

const request = require(`request-promise-native`),
    cheerio = require(`cheerio`);


module.exports = async (_message, _api, split) => {
    let $;
    if (split.length >= 1) {
        let url = `https://www.miejski.pl/slowo-`;
        url += split.reduce((acc, value) => acc += `${value}+`, ``).slice(0, -1);
        $ = await request({ uri: url, transform: body => cheerio.load(body) });
    } else {
        $ = await request({ uri: `https://www.miejski.pl/losuj`, followAllRedirects: true, transform: body => cheerio.load(body) });
    }
    const word = $(`h1`).text();
    const definition = $(`.definition.summary`).text();
    const example = $(`.example`).text();
    return `${word}\n${definition}\n${example}`;
};