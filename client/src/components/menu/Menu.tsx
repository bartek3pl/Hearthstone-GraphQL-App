import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tabs,
  Tab,
  Paper,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ViewAgenda from '@material-ui/icons/ViewAgenda';
import ViewCarousel from '@material-ui/icons/ViewCarousel';
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
import TabPanel from '../tabPanel/TabPanel';
import Cards from '../cards/Cards';
import FavouriteCards from '../favouriteCards/FavouriteCards';
import Decks from '../decks/Decks';
import hearthstoneLogo from '../../assets/hearthstoneLogo.svg';

const Menu = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [currentTab, setCurrentTab] = useState<number>(0);

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
    window.location.replace(routes.login);
  };

  useEffect(() => {
    if (!token && responseMessage) {
      showSuccessNotification(responseMessage);
      history.push(routes.login);
    }
  }, [token]);

  const handleTabChange = (_event: React.FormEvent, value: number) => {
    setCurrentTab(value);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img
            src={hearthstoneLogo}
            className={styles.logo}
            alt="hearthstone logo"
          />
          <Typography variant="h6" className={styles.title}>
            Hearthstone API
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>

        <Paper square>
          <Tabs
            value={currentTab}
            indicatorColor="primary"
            textColor="primary"
            aria-label="menu navigation tabs"
            onChange={handleTabChange}
          >
            <Tab label="Cards" icon={<ViewCarousel />} />
            <Tab label="Favourite Cards" icon={<FavoriteIcon />} />
            <Tab label="Decks" icon={<ViewAgenda />} />
          </Tabs>
        </Paper>
      </AppBar>

      <TabPanel value={currentTab} index={0}>
        <Cards />
      </TabPanel>

      <TabPanel value={currentTab} index={1}>
        <FavouriteCards />
      </TabPanel>

      <TabPanel value={currentTab} index={2}>
        <Decks />
      </TabPanel>
    </>
  );
};

export default Menu;
