import React, {useEffect, useState} from "react";
import {AuthInput} from "../../components";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockIcon from '@material-ui/icons/Lock';
import {Button} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import {useDispatch, useSelector} from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {authRegister,} from '../../redux/slices/auth';
import {useForm} from "react-hook-form";


const RegisterComponents = () => {
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
    const onSubmit = async (data, event) => {
        event.preventDefault();
        dispatch(authRegister(values));
        return setOpenSnackBar(true);
    };
    return (
        <form className="auth-container" onSubmit={handleSubmit(onSubmit)}>
            <span className="title"> Register</span>
            <div className="container-input">
            <AuthInput name="name" placeholder="name" icon={<PersonIcon className="icon-input"/>}
                       handleFunction={handleChange} submitFunction={{...register('name', {required: true})}}/>
            {errors.name && <span>This field is required</span>}
            </div>
            <div className="container-input">
            <AuthInput name="email" placeholder="email@test.com" icon={<MailOutlineIcon className="icon-input"/>}
                       handleFunction={handleChange} submitFunction={{...register('email', {required: true})}}/>
            {errors.email && <span>This field is required</span>}
            </div>
            <div className="container-input">
            <AuthInput name="password" placeholder="password" typeInput="password"
                       icon={<LockIcon className="icon-input"/>} handleFunction={handleChange}
                       submitFunction={{...register('password', {required: true})}}/>
            {errors.password && <span>This field is required</span>}
            </div>
            <div className="container-input">
            <AuthInput name="password_confirmation" placeholder="confirm password" typeInput="password"
                       icon={<LockIcon className="icon-input"/>} handleFunction={handleChange}
                       submitFunction={{...register('password_confirmation', {required: true})}}/>
            {errors.password_confirmation && <span>This field is required</span>}
            </div>
            <div className="auth-buttons">
                <Button variant="contained" className="main-button" type="submit">
                    Register
                </Button>
                <Button variant="outlined" className="secondary-button" onClick={() => window.location.href = '/login'}>
                    Login
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

export default RegisterComponents;