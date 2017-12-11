'use strict';

const express = require('express');
const router = express.Router();
const { Note }  = require('../models');

/**
 * Get a list of your notes
 */
router.get('/notes', async (req, res) => {
    try {
        let posts = await Note.find({});
        res.json(posts);
    } catch (e) {
        res.json({ status: 'Error', message: e.message });
    }
});

/**
 * Get a note by its ID
 */
router.get('/notes/:noteID', async (req, res) => {
    try {
        let post = await Note.findOne({ '_id': req.params.noteID });
        if(post === null)
            res.json({ status: 'Error', message: 'Not Found' });
        res.json(post);
    } catch (e) {
        res.json({ status: 'Error', message: e.message });
    }
});

/**
 * Add a new note
 */
router.post('/notes', async (req, res) => {
    try {
        let note = new Note({
            title: req.body.title,
            body: req.body.body
        });
        await note.save();
        res.json({ status: 'OK' });
    } catch (e) {
        res.status(400).json({ status: 'Error', message: e.message });
    }
});

/**
 * Edit a note
 */
router.put('/notes/:noteID', async (req, res) => {
    try {
        let post = await Note.findOneAndUpdate({ '_id': req.params.noteID }, req.body);
        res.json(post);
    } catch (e) {
        res.status(400).json({ status: 'Error', message: e.message });
    }
});

/**
 * Delete a note
 */
router.delete('/notes/:noteID', async (req, res) => {
    try {
        await Note.deleteOne({ '_id': req.params.noteID });
        res.json({ status: 'OK', message: 'Deleted.' });
    } catch(e) {
        res.status(400).json({ status: 'Error', message: e.message });
    }
});

module.exports = router;
