import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Components
import Trello from "src/components/index";

// Other
import { createStore as Store } from "src/redux/store";


const App = () => {
  return (
    <Provider store={Store}>
      <Trello />
    </Provider>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));
