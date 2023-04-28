import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import { API_URL } from "../constants";
import Snackbar from "@mui/material/Snackbar";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";


import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [msg, setMsg] = useState();
  const [open, setOpen] = useState(false);

  const [columns] = useState([
    { field: "firstname", sortable: true, filter: true, width: 130 },
    { field: "lastname", sortable: true, filter: true, width: 130 },
    { field: "streetaddress", sortable: true, filter: true, width: 160 },
    { field: "postcode", sortable: true, filter: true, width: 120 },
    { field: "city", sortable: true, filter: true, width: 120 },
    { field: "email", sortable: true, filter: true, width: 180 },
    { field: "phone", sortable: true, filter: true, width: 140 },

    {
      cellRenderer: (params) => (
        <EditCustomer params={params.data} updateCustomer={updateCustomer} />
      ),
      width: 80,
    },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          color="error"
          onClick={() => deleteCustomer(params)}
        >
          Delete
        </Button>
      ),
      width: 120,
    },

    {
      cellRenderer: (params) => (
        <AddTraining
          customer={params.data.links[0].href}
          saveTraining={addTraining}
        />
      ),
      width: 140
    }    
  ]);

  const deleteCustomer = (params) => {
    //console.log(params.data)
    if (window.confirm("Are you sure?")) {
      fetch(params.data.links[0].href, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer deleted successfully");
            setOpen(true);
            getCustomers();
          } else {
            alert("Something went wrong in deletion");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const getCustomers = () => {
    fetch(API_URL + "/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else alert("Something went wrong in GET request");
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const addCustomer = (customer) => {
    fetch(API_URL + "/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    })
      .then((response) => {
        if (response.ok) {
          getCustomers();
          setMsg("Customer added successfully");
          setOpen(true);
        } else {
          alert("Something went wrong in addition: " + response.statusText);
        }
      })
      .catch((err) => console.error(err));
  };

  const addTraining = (training) => {
    fetch(API_URL + "/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Training added successfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong in addition: " + response.statusText);
        }
      })
      .catch((err) => console.error(err));
  };

  const updateCustomer = (updatedCustomer, url) => {
    fetch(url, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedCustomer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Customer edited successfully");
          setOpen(true);
          getCustomers();
        } else {
          alert("Something went wrong when editing");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <AddCustomer addCustomer={addCustomer} />
      <div
        className="ag-theme-material"
        style={{ width: "90%", height: 600, margin: "auto" }}
      >
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          pagination={true}
          paginationPageSize={10}
        />
        <Snackbar
          open={open}
          message={msg}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
        />
      </div>
    </>
  );
};

export default CustomerList;
