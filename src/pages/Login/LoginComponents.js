import React, {useEffect, useState} from "react";
import {AuthInput} from "../../components";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import {Button} from "@material-ui/core";
import {useDispatch, useSelector} from 'react-redux';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {useForm} from 'react-hook-form';
import {login} from "../../redux/slices/auth";

const LoginComponents = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const {authResult, success} = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        setValidationResult(authResult);
    }, [authResult]);
    useEffect(() => {
        setValidationStatus(success);
    }, [success]);
    const [values, setValues] = useState({});
    const [validationResult, setValidationResult] = useState(authResult);
    const [validationStatus, setValidationStatus] = useState(success);
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleChange = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (data,event) => {
        event.preventDefault();
        await dispatch(login(values));
        return setOpenSnackBar(true);
    };
    return (
        <form className="auth-container" onSubmit={handleSubmit(  onSubmit)}>
            <span className="title"> Login</span>
            <div className="container-input">
                <AuthInput name="email" placeholder="email@test.com" icon={<MailOutlineIcon className="icon-input"/>}
                           handleFunction={handleChange}
                           submitFunction={{...register('email', {required: true, pattern: /^\S+@\S+$/i})}}/>
                {errors.email && <span>This field is required</span>}
            </div>
            <div className="container-input">
                <AuthInput name="password" placeholder="password" typeInput="password"
                           icon={<LockIcon className="icon-input"/>} handleFunction={handleChange}
                           submitFunction={{...register('password', {required: true})}}/>
                {errors.password && <span>This field is required</span>}
            </div>
            <div className="auth-buttons">
                <Button variant="contained" className="main-button" type="submit">
                    Login
                </Button>
                <Button variant="outlined" className="secondary-button"
                        onClick={() => window.location.href = '/register'}>
                    Register
                </Button>
            </div>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={3000}
                anchorOrigin={{
                    vertical: 'Bottom',
                    horizontal: 'Right',
                }}
                onClose={() => setOpenSnackBar(false)}
            >
                <Alert
                    severity={validationStatus ? 'success' : 'error'}
                    onClose={() => setOpenSnackBar(false)}
                >
                    {validationResult}
                </Alert>
            </Snackbar>
        </form>
    )
}

export default LoginComponents;