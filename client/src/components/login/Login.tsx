import * as React from 'react';
import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  CircularProgress,
  Link,
  InputAdornment,
  Paper,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import { login } from '../../store/user/userActions';
import {
  openNotification,
  setNotificationMessage,
  setNotificationSeverity,
} from '../../store/notification/notificationActions';
import * as status from '../notification/Notification';
import * as styles from './Login.module.scss';
import { validateLogin, validatePassword } from '../../utils/dataValidations';
import routes from '../../routes/routesStrings';
import { UserReducers } from '../../interfaces/Reducers';

interface LoginMutationInput {
  login: string;
  password: string;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

interface LoginMutationResponse {
  login: {
    success: boolean;
    message: string;
    token: Token;
  };
}

const LOGIN = gql`
  mutation logIn($input: UserInput) {
    login(input: $input) {
      success
      message
      token {
        accessToken
        refreshToken
      }
      user {
        _id
      }
    }
  }
`;

const LOGIN_VALIDATION =
  'Login should have length between 6 and 30 characters.';
const PASSWORD_VALIDATION =
  'Password should contain at least one uppercase character and should have length between 6 and 30 characters.';

const Login = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const authenticated = useSelector<UserReducers, boolean>(
    (state) => state.userReducers.authenticated
  );
  const responseMessage = useSelector<UserReducers, string>(
    (state) => state.userReducers.responseMessage
  );
  const loading = useSelector<UserReducers, boolean>(
    (state) => state.userReducers.loading
  );
  const token = useSelector<UserReducers, string>(
    (state) => state.userReducers.token
  );
  const error = useSelector<UserReducers, boolean>(
    (state) => state.userReducers.error
  );

  const [logIn] = useMutation<
    LoginMutationResponse,
    { input: LoginMutationInput }
  >(LOGIN);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showNotification = (message: string, severity: string) => {
    dispatch(setNotificationMessage(message));
    dispatch(setNotificationSeverity(severity));
    dispatch(openNotification());
  };

  const showSuccessNotification = (message: string) => {
    showNotification(message, status.SUCCESS_NOTIFICATION);
  };

  const showErrorNotification = (message: string) => {
    showNotification(message, status.ERROR_NOTIFICATION);
  };

  useEffect(() => {
    if (authenticated && token && !error) {
      showSuccessNotification(responseMessage);
      history.push(routes.menu);
    } else if (responseMessage && error) {
      showErrorNotification(responseMessage);
    }
  }, [authenticated, token, responseMessage]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login(username, password, logIn));
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const isFormValid = () =>
    validateLogin(username) && validatePassword(password);

  const shouldLoginErrorDisplay = () =>
    !validateLogin(username) && username !== '';

  const shouldPasswordErrorDisplay = () =>
    !validatePassword(password) && password !== '';

  return (
    <Grid container component="main" className={styles.root}>
      <Grid item xs={false} sm={4} md={7} className={styles.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={styles.paper}>
          <Avatar className={styles.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="login"
                  placeholder="Login"
                  name="login"
                  autoComplete="login"
                  onChange={handleLoginChange}
                  value={username}
                  error={shouldLoginErrorDisplay()}
                  helperText={shouldLoginErrorDisplay() && LOGIN_VALIDATION}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermIdentityOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                  value={password}
                  error={shouldPasswordErrorDisplay()}
                  helperText={
                    shouldPasswordErrorDisplay() && PASSWORD_VALIDATION
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        onClick={handlePasswordVisibility}
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <div className={styles.buttonWrapper}>
              <Button
                type="submit"
                size="large"
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
                disabled={!isFormValid() || loading}
              >
                Login
              </Button>
              {loading && (
                <CircularProgress size={24} className={styles.buttonProgress} />
              )}
            </div>
          </form>
          <Typography className={styles.link}>
            <Link href={routes.registration}>
              Don&apos;t have account? Go to registration page.
            </Link>
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
