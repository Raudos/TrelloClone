function getColumnsData(structure) {
  const columns = {};

  structure.forEach(column => {
    columns[column._id] = {
      _id: column.id,
      name: column.name
    };
  });

  return columns;
};

export default (state, action) => {
  switch (action.type) {
    case 'seedBoard':
      return getColumnsData(action.data.structure);
  default:
    return state;
  }
};
