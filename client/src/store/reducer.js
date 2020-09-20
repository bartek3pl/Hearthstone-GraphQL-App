import { combineReducers } from 'redux';
import userReducers from './user/userReducers';
import notificationReducers from './notification/notificationReducers';

export default combineReducers({
  userReducers,
  notificationReducers,
});
