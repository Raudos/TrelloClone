function getTasksData(structure) {
  const tasks = {};

  structure.forEach(column => {
    column.tasks.forEach(task => {
      tasks[task._id] = task;
    })
  });

  return tasks;
};

export default (state, action) => {
  switch (action.type) {
    case 'seedBoard':
      return getTasksData(action.data.structure);
  default:
    return state;
  }
};
