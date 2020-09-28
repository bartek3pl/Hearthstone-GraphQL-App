import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './App';
import initialState from './store/user/initialState';
import './index.scss';

const store = configureStore(initialState);

const container = document.getElementById('container');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
