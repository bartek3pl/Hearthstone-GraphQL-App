import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/user/userActions';
import routes from '../../routes/routesStrings';
import * as styles from './Menu.module.scss';
import { UserReducers } from '../../interfaces/Reducers';
import * as status from '../notification/Notification';
import {
  openNotification,
  setNotificationMessage,
  setNotificationSeverity,
} from '../../store/notification/notificationActions';

const Menu = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const token = useSelector<UserReducers, string>(
    (state) => state.userReducers.token
  );
  const responseMessage = useSelector<UserReducers, string>(
    (state) => state.userReducers.responseMessage
  );

  const showNotification = (message: string, severity: string) => {
    dispatch(setNotificationMessage(message));
    dispatch(setNotificationSeverity(severity));
    dispatch(openNotification());
  };

  const showSuccessNotification = (message: string) => {
    showNotification(message, status.SUCCESS_NOTIFICATION);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!token && responseMessage) {
      showSuccessNotification(responseMessage);
      history.push(routes.login);
    }
  }, [token]);

  return (
    <div className={styles.menuWrapper}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Hearthstone API</Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
