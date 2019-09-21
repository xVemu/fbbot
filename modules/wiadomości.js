`use strict`;

module.exports = (fn, message, api) => {
    api.getThreadInfo(message.threadID, (err, info) => {
        if(err) console.error(err);
        fn(`Odkąd mnie dodano napisano ${info.messageCount.toString()} wiadomości`);
    });
}