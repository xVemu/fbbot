`use strict`;

const LeagueJS = require(`leaguejs`);


const { lolKey } = require(`../../config.json`),
    leagueJs = new LeagueJS(lolKey),
    queueTypes = {
        'RANKED_SOLO_5x5': `Solo/Duo: `,
        'RANKED_FLEX_SR': `Flex: `,
        'RANKED_FLEX_TT': `Flex 3v3: `,
        'RANKED_TFT': `TFT: `
    };


module.exports = {
    name: `lol`,
    description: `Wysyła statystki gracza League of Legends`,
    args: 1,
    groupOnly: false,
    alises: [`liga`],
    usage: `<nick> (region[domyślnie: eune])`,
    async execute(api, msg, args) {
        const { threadID, messageID } = msg;
        try {
            const region = args[1] == `euw` ? `euw1` : `eun1`;
            const { id, name, summonerLevel, revisionDate } = await leagueJs.Summoner.gettingByName(args[0], region);
            const entries = await leagueJs.League.gettingEntriesForSummonerId(id, region);
            const ranks = entries.map(v => `${queueTypes[v.queueType]}: ${v.tier} ${v.rank} ${v.leaguePoints}LP(${v.wins}W/${v.losses}P)`);
            const msg = `
Nick: ${name}
Poziom: ${summonerLevel}
Ostatnio online : ${timeConverter(revisionDate)}
${ranks}
    `;
            api.sendMessage(msg, threadID);
        } catch (e) {
            if (e.message.startsWith(`Summoner name`)) api.sendMessage(`Niepoprawny nick!`, threadID, null, messageID);
            else if (e.statusCode === 404) msg.reply(`Nie znaleziono przywoływacza!`);
            else {
                msg.reply(`Wystąpił błąd!`);
                console.error(e);
            }
        }
    }
};

const timeConverter = UNIX_timestamp => {
    const a = new Date(UNIX_timestamp),
        months = [`Sty`, `Lut`, `Mar`, `Kwi`, `Maj`, `Cze`, `Lip`, `Sie`, `Wrz`, `Paź`, `Lis`, `Gru`],
        time = a.getDate() + ` ` + months[a.getMonth()] + ` ` + a.getFullYear() + ` ` + a.getHours() + `:` + a.getMinutes() + `:` + a.getSeconds();
    return time;
};