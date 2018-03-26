
export default (state, action) => {
  switch (action.type) {
    case 'seedBoard':
      return action.data;
    case "updateColumns":
      return {
        ...state,
        columns: action.data
      };
  default:
    return state;
  }
};
