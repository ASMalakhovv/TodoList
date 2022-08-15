// @ts-ignore
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {useAppSelector} from "../../AppWithRedux";
import {useDispatch} from "react-redux";
import {setErrorApp} from "../../state/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    let isError = useAppSelector<string | null>((state) => state.app.isError)
    const dispatch = useDispatch()


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorApp({isError: null}))
    };
// @ts-ignore
    return (
        <Snackbar open={isError !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" >
                {isError} 😠
            </Alert>
        </Snackbar>
    );
}
