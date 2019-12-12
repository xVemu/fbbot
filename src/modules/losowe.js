`use strict`;

module.exports = (_api, _message, split) => (Math.floor(Math.random() * split[0]) + 1).toString();