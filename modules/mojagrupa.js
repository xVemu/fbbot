`use strict`;

module.exports = (fn, message) => {
    if (groupone.includes(message.senderID)) {
        let mentions = [];
        groupone.map((v) => {
            mentions.push({tag: `WSTAWAĆ!`, id: v});
        });
        fn({body: `WSTAWAĆ!`, mentions: mentions});
    } else if (grouptwo.includes(message.senderID)) {
        let mentions = [];
        groupone.map((v) => {
            mentions.push({tag: `WSTAWAĆ!`, id: v});
        });
        fn({body: `WSTAWAĆ!`, mentions: mentions});
    }
}
const groupone = [];
const grouptwo = [];