function clearStructure(structure) {
  return structure.map(column => ({
    _id: column._id,
    tasks: column.tasks.map(task => task._id)
  }));
};

export default (state, action) => {
  switch (action.type) {
    case 'seedBoard':
      return {
        ...action.data,
        structure: clearStructure(action.data.structure)
      };
    case "updateColumns":
      return {
        ...state,
        structure: action.data
      };
  default:
    return state;
  }
};
