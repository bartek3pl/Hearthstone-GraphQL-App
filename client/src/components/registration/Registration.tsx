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
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import * as styles from './Registration.module.scss';
import { validateLogin, validatePassword } from '../../utils/dataValidations';
import { User } from '../../interfaces/User';
import routes from '../../routes/routesStrings';
import * as status from '../notification/Notification';
import { register } from '../../store/user/userActions';
import {
  openNotification,
  setNotificationMessage,
  setNotificationSeverity,
} from '../../store/notification/notificationActions';
import { UserReducers } from '../../interfaces/Reducers';

interface RegisterMutationInput {
  login: string;
  password: string;
}

interface RegisterMutationResponse {
  register: {
    success: boolean;
    message: string;
    user: User;
  };
}

const LOGIN_VALIDATION =
  'Login should have length between 6 and 30 characters.';
const PASSWORD_VALIDATION =
  'Password should contain at least one uppercase character and should have length between 6 and 30 characters.';
const CONFIRM_PASSWORD_VALIDATION =
  'Confirmation password should be the same as password.';

const REGISTER = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
      success
      message
    }
  }
`;

const Registration = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const responseMessage = useSelector<UserReducers, string>(
    (state) => state.userReducers.responseMessage
  );
  const loading = useSelector<UserReducers, boolean>(
    (state) => state.userReducers.loading
  );
  const error = useSelector<UserReducers, boolean>(
    (state) => state.userReducers.error
  );

  const [registerFunction] = useMutation<
    RegisterMutationResponse,
    { input: RegisterMutationInput }
  >(REGISTER);

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
    if (responseMessage && !error) {
      showSuccessNotification(responseMessage);
      history.push(routes.menu);
    } else if (responseMessage && error) {
      showErrorNotification(responseMessage);
    }
  }, [responseMessage, error]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(register(username, password, registerFunction));
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setConfirmPassword(event.target.value);

  const isFormValid = () =>
    validateLogin(username) &&
    validatePassword(password) &&
    password === confirmPassword;

  const shouldLoginErrorDisplay = () =>
    !validateLogin(username) && username !== '';

  const shouldPasswordErrorDisplay = () =>
    !validatePassword(password) && password !== '';

  const shouldConfirmPasswordErrorDisplay = () =>
    password !== confirmPassword && confirmPassword !== '';

  return (
    <div className={styles.paper}>
      <Avatar className={styles.avatar}>
        <LockIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
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
              helperText={shouldPasswordErrorDisplay() && PASSWORD_VALIDATION}
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
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              error={shouldConfirmPasswordErrorDisplay()}
              helperText={
                shouldConfirmPasswordErrorDisplay() &&
                CONFIRM_PASSWORD_VALIDATION
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon />
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
            Register
          </Button>
          {loading && (
            <CircularProgress size={24} className={styles.buttonProgress} />
          )}
        </div>
      </form>
      <Typography className={styles.link}>
        <Link href={routes.login}>Already signed up? Go to login page.</Link>
      </Typography>
    </div>
  );
};

export default Registration;
