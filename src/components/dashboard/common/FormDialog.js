import {
    Dialog,
    Slide,
} from '@mui/material';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const ModalModelo = ({ open, setOpenModal, children, ...props }) => {
    const handleClose = () => setOpenModal(false);

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                {...props}
            >
                {children}
            </Dialog>
        </>
    )
}
export default ModalModelo;