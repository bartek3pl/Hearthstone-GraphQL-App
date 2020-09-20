import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const consoleMessages = (store) => (next) => (action) => {
  const result = next(action);
  const { userReducers, notificationReducers } = store.getState();

  console.groupCollapsed(`dispatching action => ${action.type}`);
  console.log('%c userReducers', 'font-weight: bold', userReducers);
  console.log(
    '%c notificationReducers',
    'font-weight: bold',
    notificationReducers
  );
  console.groupEnd();

  return result;
};

export default (initialState = {}) =>
  applyMiddleware(thunk, consoleMessages)(createStore)(reducer, initialState);
