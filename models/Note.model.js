'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);
