
export default (state, action) => {
  switch (action.type) {
    case 'downloadTaskDetails':
      return {
        ...state,
        [action.data._id]: action.data
      };
  default:
    return state;
  }
};
