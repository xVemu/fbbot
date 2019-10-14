`use strict`;

module.exports = (fn, {threadID}, api) => {
    api.getThreadInfo(threadID, (err, {messageCount}) => {
        if(err) console.error(err);
        fn(`Odkąd mnie dodano napisano ${messageCount.toString()} wiadomości`);
    });
};