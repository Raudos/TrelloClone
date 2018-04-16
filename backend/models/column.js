const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  }
});

const Column = mongoose.model('Column', ColumnSchema);

module.exports = { Column, ColumnSchema };
