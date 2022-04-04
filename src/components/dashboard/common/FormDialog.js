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

const ModalModelo = ({ open, setOpenModal, children, title , maxWidth}) => {
    const handleClose = () => setOpenModal(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xl'));
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                fullWidth
                maxWidth={maxWidth}
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