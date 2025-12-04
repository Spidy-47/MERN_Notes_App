const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notes = require('../controllers/notesController');

router.get('/', auth, notes.getNotes);
router.post('/', auth, notes.createNote);
router.put('/:id', auth, notes.updateNote);
router.delete('/:id', auth, notes.deleteNote);

module.exports = router;
