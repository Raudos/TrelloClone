
export default (state, action) => {
  switch (action.type) {
    case 'seedBoard':
      return true;
  default:
    return state;
  }
};
