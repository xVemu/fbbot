`use strict`;

const axios = require(`axios`).default,
    cheerio = require(`cheerio`),
    uft8 = require(`utf8`);



module.exports = {
    name: `miejski`,
    description: `Wysyła wyjaśnienie ze słownika miejski.pl`,
    args: 0,
    groupOnly: false,
    aliases: [`urban`],
    usage: `(słowo)`,
    async execute(api, msg, args) {
        const { threadID, messageID } = msg;
        try {
            let $;
            if (args.length >= 1) {
                let url = `https://www.miejski.pl/slowo-`;
                url += args.map(v => v.replace(` `, `+`)).join(``);
                const { data } = await axios.get(uft8.encode(url));
                $ = cheerio.load(data);
            } else {
                const { data } = await axios.get(`https://www.miejski.pl/losuj`);
                $ = cheerio.load(data);
            }
            const article = $(`article`).first();
            const word = article.find(`h1`).first().text();
            const definition = article.find(`p`).first().text();
            const example = article.find(`blockquote`).first().text();
            api.sendMessage(`${word}\n${definition}\n${example}`, threadID);
        } catch (e) {
            if (e.status === 404) return api.sendMessage(`Nie znaleziono definicji!`, threadID, null, messageID);
            console.error(e);
            api.sendMessage(`Wystąpił błąd!`, threadID, null, messageID);
        }
    } 
};