import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

import './index.css';
import WebSocketProvider from './components/providers/WebSocket';
import App from './components/App';
import reducers from './store/reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(reduxThunk, reduxLogger))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { store };
