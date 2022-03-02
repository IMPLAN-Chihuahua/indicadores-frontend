import {
    Grid,
    Dialog,
    Typography,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
    Container,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalModelo = ({ id, open, setOpenModal, children, title }) => {
    const handleClose = () => setOpenModal(false);

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'black'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                {children}
            </Dialog>
        </>
    )
}
export default ModalModelo;