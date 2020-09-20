import * as React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './routes/Routes';
import Notification from './components/notification/Notification';
import { hideNotification } from './store/notification/notificationActions';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const dispatch = useDispatch();

  const openNotification = useSelector<any, any>(
    (state) => state.notificationReducers.opened
  );
  const notificationSeverity = useSelector<any, any>(
    (state) => state.notificationReducers.severity
  );
  const notificationMessage = useSelector<any, any>(
    (state) => state.notificationReducers.message
  );

  const handleHideNotification = () => {
    dispatch(hideNotification());
  };

  return (
    <>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>

      <Notification
        open={openNotification}
        handleClose={handleHideNotification}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </>
  );
};

export default App;
