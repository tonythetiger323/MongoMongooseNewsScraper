const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  title: String,
  body: String,
  //eslint-disable-next-line
  article: [{ type: Schema.ObjectId, ref: 'Article' }]
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
