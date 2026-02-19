import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function AddTraining(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    activity: props.activity || "",
    date: props.date || "",
    duration: props.duration || "",
    customer: props.customer || "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveTraining = () => {
    const updatedTraining = {
      ...training,
      date: new Date(training.date).toISOString(),
    };
    props.saveTraining(updatedTraining);
    handleClose();
  };

  const handleInputChange = (e) => {
    setTraining({ ...training, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button onClick={handleClickOpen}>New Training</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            name="activity"
            value={training.activity}
            onChange={handleInputChange}
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={training.date}
              onChange={(date) => setTraining({ ...training, date })}
              textField={(props) => <TextField {...props} />}
              format="DD.MM.YY HH:mm"
            />
          </LocalizationProvider>
          <TextField
            name="duration"
            value={training.duration}
            onChange={handleInputChange}
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={saveTraining}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTraining;
