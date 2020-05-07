import React, { useState } from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import snackbarStore, { SnackbarState } from '../stores/snackbarStore';
import useStoreSubscribe from '../hooks/useStoreSubscribe';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Snackbar: React.FC = () => {
    const [state, setState] = useState<SnackbarState>(snackbarStore.getState());

    useStoreSubscribe(snackbarStore, (state: SnackbarState) => {
        setState(state);
    });

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        snackbarStore.setState(null);
    };

    if (!state) {
        return null;
    }

    return (
        <MuiSnackbar open autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={state?.type}>
                {state?.text}
            </Alert>
        </MuiSnackbar>
    );
};

export default Snackbar;