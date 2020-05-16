import React, {useState} from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';

import snackbarStore from '../stores/snackbarStore';
import NotificationRecord from '../records/NotificationRecord';
import useStoreSubscribe from '../hooks/useStoreSubscribe';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snackbar: React.FC = () => {
  const [state, setState] = useState<NotificationRecord>(
    snackbarStore.getState()[0]
  );

  useStoreSubscribe(snackbarStore, (newState: NotificationRecord[]) => {
    setState(newState[0]);
  });

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    snackbarStore.removeNotification(state);
  };

  if (!state) {
    return null;
  }

  return (
    <MuiSnackbar open autoHideDuration={3000} onClose={handleClose}>
      <Alert severity={state?.type}>{state?.text}</Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
