import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './routes/Routes';
import Notification from './components/notification/Notification';
import { hideNotification } from './store/notification/notificationActions';
import { NotificationReducers } from './interfaces/Reducers';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const dispatch = useDispatch();

  const openNotification = useSelector<NotificationReducers, boolean>(
    (state) => state.notificationReducers.opened
  );
  const notificationSeverity = useSelector<NotificationReducers, string>(
    (state) => state.notificationReducers.severity
  );
  const notificationMessage = useSelector<NotificationReducers, string>(
    (state) => state.notificationReducers.message
  );

  const handleHideNotification = () => {
    dispatch(hideNotification());
  };

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>

      <Notification
        open={openNotification}
        handleClose={handleHideNotification}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </ErrorBoundary>
  );
};

export default App;
