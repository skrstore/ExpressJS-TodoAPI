const express = require('express');

const note = require('./controllers');

const router = express.Router();

router.get('/', note.getAll);
router.get('/:id', note.getOne);
router.delete('/:id', note.deleteOne);
router.patch('/:id', note.updateOne);
router.post('/', note.add);

module.exports = router;
