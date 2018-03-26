import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Components
import Trello from "components/index";

// Other
import { createStore as Store } from "redux/store";


const App = () => {
  return (
    <Provider store={Store}>
      <Trello />
    </Provider>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));
