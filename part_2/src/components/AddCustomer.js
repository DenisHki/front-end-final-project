import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddCustomer({addCustomer}) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',
      phone: ''    
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        addCustomer(customer);
        setOpen(false);
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: '' 
        })
    };

    return (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            New Customer
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Customer</DialogTitle>
            <DialogContent>
              <TextField
                value={customer.firstname}
                onChange={e => setCustomer({...customer, firstname: e.target.value})}
                margin="dense"
                label="FirstName"
                fullWidth
                variant='standard'
              />
              <TextField
                value={customer.lastname}
                onChange={e => setCustomer({...customer, lastname: e.target.value})}
                margin="dense"
                label="LastName"
                fullWidth
                variant='standard'
              />
              <TextField
                value={customer.streetaddress}
                onChange={e => setCustomer({...customer, streetaddress: e.target.value})}
                margin="dense"
                label="StreetAddress"
                fullWidth
                variant='standard'
              />
              <TextField
                value={customer.postcode}
                onChange={e => setCustomer({...customer, postcode: e.target.value})}
                margin="dense"
                label="Postcode"
                fullWidth
                variant='standard'
              />
              <TextField
                value={customer.city}
                onChange={e => setCustomer({...customer, city: e.target.value})}
                margin="dense"
                label="City"
                fullWidth
                variant='standard'
              />
              <TextField
                value={customer.email}
                onChange={e => setCustomer({...customer, email: e.target.value})}
                margin="dense"
                label="Email"
                fullWidth
                variant='standard'
              />
              <TextField
                value={customer.phone}
                onChange={e => setCustomer({...customer, phone: e.target.value})}
                margin="dense"
                label="Phone"
                fullWidth
                variant='standard'
              />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
          </Dialog>  
        </div>
    );
}

export default AddCustomer;