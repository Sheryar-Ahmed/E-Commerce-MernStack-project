import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
export default function PositionedSnackbar({ openSnack, setOpenSnack, message, severity }) {

    const handleClose = () => {
        setOpenSnack(false);
    };
    const options = {
        vertical: 'bottom',
        horizontal: 'center',
    }
    const { vertical, horizontal } = options;
    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}