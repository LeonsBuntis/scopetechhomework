import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingBackdrop = ({ show }: { show: boolean }) => {
    return (<Backdrop
        sx={{ color: '#fff', zIndex: 1002 }}
        open={show}>
        <CircularProgress color="inherit" />
    </Backdrop>);
}

export default LoadingBackdrop;