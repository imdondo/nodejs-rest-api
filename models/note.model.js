const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    id: Number,
    topic: String,
    description: String
});

module.exports = mongoose.model('Note', NoteSchema);