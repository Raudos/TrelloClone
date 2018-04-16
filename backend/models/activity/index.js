const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { CommentSchema } = require("./comment");
const { ColumnChangeSchema } = require("./columnChange");

const ActivitySchema = new Schema({
  date: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    maxlength: 12
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Activity = mongoose.model('Activity', ActivitySchema);
const Comment = Activity.discriminator("Comment", CommentSchema);
const ColumnChange = Activity.discriminator("ColumnChange", ColumnChangeSchema);

module.exports = {
  Activity,
  ActivitySchema,
  Comment,
  CommentSchema,
  ColumnChange,
  ColumnChangeSchema
};
