const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  board: {
    type: Schema.Types.ObjectId,
    ref: 'Board'
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: 'Column'
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: "Activity"
  }]
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task, TaskSchema };
