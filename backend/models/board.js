const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectID } = require('mongodb');
const R = require("ramda");

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
  structure: {
    type: Array,
    required: true,
    validate: {
      validator: structure => {
        let idsArr = structure.map(column => column._id);

        structure.forEach(column => {
          idsArr = idsArr.concat(column.tasks)
        });

        const objFilteredArr = idsArr.filter(id => ObjectID.isValid(id));
        const uniqArr = R.uniq(idsArr);

        return idsArr.length === objFilteredArr.length && idsArr.length === uniqArr.length;
      },
      message: "Wrong structure."
    }
  }
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = { Board, BoardSchema };
