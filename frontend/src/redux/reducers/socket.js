import io from "socket.io-client";

export default (state, action) => {
  switch (action.type) {
    case 'seedBoard':
      return io('http://localhost:3000');
    case 'disconnectSocket':
      return null;
  default:
    return state;
  }
};
