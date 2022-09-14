import {
    Dialog,
    Slide,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ModalModelo = ({ open, setOpenModal, children, ...props }) => {
    const handleClose = () => setOpenModal(false);
    const theme = useTheme();
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                {...props}
                sx={{
                    maxWidth: '1000px',
                    margin: 'auto'
                }}
            >
                {children}
            </Dialog>
        </>
    )
}
export default ModalModelo;