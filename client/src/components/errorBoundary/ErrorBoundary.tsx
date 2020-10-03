import * as React from 'react';
import { Typography, Button, Grid, LinearProgress } from '@material-ui/core';
import routes from '../../routes/routesStrings';
import * as styles from './ErrorBoundary.module.scss';

interface ErrorBoundaryState {
  secondsToWait: number;
  hasError: boolean;
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  timeout: any;

  interval: any;

  constructor(props: any) {
    super(props);
    this.timeout = null;
    this.interval = null;
    this.state = {
      secondsToWait: 5,
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    const { hasError } = this.state;
    if (hasError) {
      this.timeout = this.timer();
      this.interval = this.counter();
    }
    console.error(error);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  counter = () =>
    setInterval(() => {
      this.setState(({ secondsToWait }) => ({
        secondsToWait: secondsToWait > 1 ? secondsToWait - 1 : 1,
      }));
    }, 1000);

  timer = () =>
    setTimeout(() => {
      window.location.replace(routes.login);
    }, 5000);

  handleRedirect = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.interval) {
      clearInterval(this.interval);
    }
    window.location.replace(routes.login);
  };

  render() {
    const { children } = this.props;
    const { secondsToWait, hasError } = this.state;

    return hasError ? (
      <div data-testid="error-boundary">
        <Grid className={styles.wrapper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                color="secondary"
                variant="h1"
                className={styles.oops}
              >
                OOPS!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography variant="h3" component="h2">
                  Something went wrong...
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" component="h3">
                  You will be redirected to the home page in 
                  {' '}
                  {secondsToWait}
                  {' '}
                  {secondsToWait === 1 ? 'second' : 'seconds'}
                  .
                </Typography>
              </Grid>
              <LinearProgress
                color="secondary"
                className={styles.progressLoader}
              />
              <Grid container spacing={2} className={styles.buttonWrapper}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    You can click below button to be immediately redirected to
                    the home page.
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.handleRedirect}
                  >
                    Return to homepage
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    ) : (
      children || null
    );
  }
}

export default ErrorBoundary;
