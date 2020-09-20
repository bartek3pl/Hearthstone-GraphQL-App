/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import routes from './routesStrings';
import useAuthorization from '../hooks/useAuthorization';

interface SecureRouteProps {
  children: any;
  path?: string;
}

const SecureRoute: React.FC<SecureRouteProps> = ({ children, ...rest }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const authorization = useAuthorization();

  const checkAuthentification = async () => {
    const authenticationStatus = await authorization.isAuthenticated();
    setIsAuthenticated(authenticationStatus);
    setIsLoading(false);
  };

  React.useEffect(() => {
    checkAuthentification();
  }, []);

  return isLoading ? (
    children
  ) : (
    <Route {...rest}>
      {isAuthenticated ? children : <Redirect to={routes.login} />}
    </Route>
  );
};

export default SecureRoute;
