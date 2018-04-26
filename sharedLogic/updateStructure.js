function findUpdatedIndex(receiver, dropped, key) {
  if (dropped[key] < receiver[key]) {
    return -1;
  }

  return 0;
};

function handleTaskMovement(structure, receiver, dropped) {
  const clonedStructure = JSON.parse(JSON.stringify(structure));
  const droppedColumn = clonedStructure[dropped.columnsIndex];
  const receiverColumn = clonedStructure[receiver.columnsIndex];

  if (receiver.columnsIndex === dropped.columnsIndex) {
    droppedColumn.tasks.splice(receiver.tasksIndex + findUpdatedIndex(receiver, dropped, "tasksIndex"), 0, ...droppedColumn.tasks.splice(dropped.tasksIndex, 1));
  } else {
    receiverColumn.tasks.splice(receiver.tasksIndex, 0, droppedColumn.tasks[dropped.tasksIndex]);
    droppedColumn.tasks.splice(dropped.tasksIndex, 1);
  }

  return clonedStructure;
};

function handleColumnMovement(structure, receiver, dropped) {
  const shallowStructure = structure.concat();

  shallowStructure.splice(receiver.columnsIndex + findUpdatedIndex(receiver, dropped, "columnsIndex"), 0, ...shallowStructure.splice(dropped.columnsIndex, 1));

  return shallowStructure;
};

module.exports = {
  handleTaskMovement,
  handleColumnMovement
};
