import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {Button, DialogActions, DialogContent, DialogContentText, TextField} from "@material-ui/core";


const DialogModal = (props) => {
    const {onClose, selectedValue, open,handleChange,handleSubmit} = props;

    const handleClose = () => {
        onClose(false);
    };


    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"  fullWidth>
                <DialogTitle id="form-dialog-title">Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="task title"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        name="title"
                        value={selectedValue}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

DialogModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default DialogModal;
