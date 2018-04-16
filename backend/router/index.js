// Routes
const task = require('./routes/task/index');
const board = require('./routes/board/index');
const user = require('./routes/user/index');

module.exports = app => {
  app.use("/task", task);
  // app.use("/board", board);
  // app.use("/user", user);
};
