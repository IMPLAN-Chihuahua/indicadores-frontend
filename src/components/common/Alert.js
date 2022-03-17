import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useAlert } from "../../contexts/AlertContext"

export const Alert = () => {
    const alert = useAlert();
    const [open, setOpen] = useState(true);
    const handleClose = (_, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        alert.clear();
    }

    if (alert.message !== '') {
        return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                open={open}
                onClose={handleClose}
            >
                <MuiAlert
                    severity={alert.severity}
                    onClose={handleClose}
                    sx={{ width: '100%' }}
                    closeText='Cerrar'
                >
                    {alert.message}
                </MuiAlert>
            </Snackbar>
        );
    } else {
        return null;
    }
}