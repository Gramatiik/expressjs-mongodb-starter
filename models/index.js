'use strict';

const path = require('path');

module.exports = {
    User: require(path.join(__dirname, 'User.model')),
    Note: require(path.join(__dirname, 'Note.model'))
};
