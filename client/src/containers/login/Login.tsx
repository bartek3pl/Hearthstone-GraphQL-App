import * as React from 'react';
import { Container } from '@material-ui/core';
import Login from '../../components/login/Login';

const LoginContainer = () => (
  <Container component="main" maxWidth="xs">
    <Login />
  </Container>
);

export default LoginContainer;
