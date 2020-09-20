/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

interface NotificationProps {
  open: boolean;
  severity: string;
  message: string;
  handleClose: () => void;
}

const Alert = (props: any) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
);

export const SUCCESS_NOTIFICATION = 'success';
export const ERROR_NOTIFICATION = 'error';
export const INFO_NOTIFICATION = 'info';

const Notification: React.FC<NotificationProps> = ({
  open,
  severity,
  message,
  handleClose,
}) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
  >
    <Alert onClose={handleClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

export default Notification;
