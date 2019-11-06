`use strict`;

const LeagueJS = require(`leaguejs`);


const league_api_key = `RGAPI-e23bf58f-bd6d-4174-85a9-66901d628722`,
    leagueJs = new LeagueJS(league_api_key);

module.exports = async (_message, _api, split) => {
    let region = ``;
    split[2] == `euw` ? region = `euw1` : region = `eun1`;
    const {id, name, summonerLevel, revisionDate} = await leagueJs.Summoner.gettingByName(split[1], region);
    const rank = await leagueJs.League.gettingEntriesForSummonerId(id, region);
    const ranks = rank.reduce((acc, value) => {
        const { tier, rank, leaguePoints, wins, losses, queueType } = value;
        let queue = ``;
        switch (queueType) {
            case `RANKED_SOLO_5x5`:
                queue = `Solo/Duo: `;
                break;
            case `RANKED_FLEX_SR`:
                queue = `Flex: `;
                break;
            case `RANKED_FLEX_TT`:
                queue = `Flex 3v3: `;
                break;
            default:
                return acc;
        }
        return acc += `${queue}${tier} ${rank} ${leaguePoints}LP(${wins}W/${losses}P)\n`;
    }, ``);
    const msg = `
Nick: ${name}
Poziom: ${summonerLevel}
Ostatnio online : ${timeConverter(revisionDate)}
${ranks}
    `;
    return msg;
};

const timeConverter = UNIX_timestamp => {
    const a = new Date(UNIX_timestamp),
        months = [`Sty`, `Lut`, `Mar`, `Kwi`, `Maj`, `Cze`, `Lip`, `Sie`, `Wrz`, `Paź`, `Lis`, `Gru`],
        year = a.getFullYear(),
        month = months[a.getMonth()],
        date = a.getDate(),
        hour = a.getHours(),
        min = a.getMinutes(),
        sec = a.getSeconds(),
        time = date + ` ` + month + ` ` + year + ` ` + hour + `:` + min + `:` + sec;
    return time;
};