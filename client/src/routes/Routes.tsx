import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import routes from './routesStrings';
import SecureRoute from './SecureRoute';
import Registration from '../containers/registration/Registration';
import Login from '../containers/login/Login';
import Menu from '../containers/menu/Menu';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path={routes.registration}>
          <Registration />
        </Route>
        <Route path={routes.login}>
          <Login />
        </Route>
        <SecureRoute path={routes.menu}>
          <Menu />
        </SecureRoute>
        <Redirect to={routes.login} />
      </Switch>
    </Router>
  );
};

export default Routes;
