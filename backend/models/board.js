const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  fav: {
    type: Boolean
  },
  personal: {
    type: Boolean
  },
  private: {
    type: Boolean
  },
  columns: [{
    type: Schema.Types.ObjectId,
    ref: "Column"
  }]
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = { Board, BoardSchema };