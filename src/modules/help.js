`use strict`;

const { prefix } = require(`../../config.json`);

module.exports = {
    name: `help`,
    description: `Lista komend`,
    args: 0,
    groupOnly: false,
    aliases: [`list`, `pomoc`, `h`],
    usage: `(komenda)`,
    async execute(api, msg, args) {
        const data = [];
        const { cmds } = api;

        const { threadID, messageID } = msg;

        if (!args.length) {
            data.push(`Lista komend: `);
            data.push(Array.from(cmds).map(([key]) => key).join(`, `));
            data.push(`\nWyślij ${prefix}help (komenda) aby dowiedzieć się więcej!`);

            return api.sendMessage(data.join(``), threadID);
        }
        const name = args[0].toLowerCase();
        const cmd = cmds.get(name) || cmds.find(c => c.aliases && c.aliases.includes(name));

        if (!cmd) {
            return api.sendMessage(`nie znaleziono takiej komendy!`, threadID, null, messageID);
        }

        data.push(`Nazwa: ${cmd.name}`);

        if (cmd.aliases) data.push(`Skróty: ${cmd.aliases.join(`, `)}`);
        if (cmd.description) data.push(`Opis: ${cmd.description}`);
        if (cmd.usage) data.push(`Użycie: ${prefix}${cmd.name} ${cmd.usage}`);

        api.sendMessage(data.join(`\n`), threadID);
    }
};