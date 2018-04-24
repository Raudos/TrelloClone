export const initialiseConnection = () => {
  dispatch({
    type: "initialiseConnection"
  });
};

export const disconnectSocket = () => {
  dispatch({
    type: "disconnectSocket"
  });
};
