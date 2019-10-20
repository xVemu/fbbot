`use strict`;

module.exports = ({threadID}, api) => {
    return new Promise(resolve => {
        api.getThreadInfo(threadID, (err, {messageCount}) => {
            if(err) console.error(err);
            resolve(`Odkąd mnie dodano napisano ${messageCount.toString()} wiadomości`);
        });
    });
};