import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

 const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState();
    const [open, setOpen] = useState(false);
  
    const [columns] = useState([
      { field: "activity", sortable: true, filter: true, width: 140 },
      {
        field: "date",
        sortable: true,
        filter: true,
        width: 150,
        valueFormatter: (params) => {
          return dayjs(params.value).format("DD.MM.YYYY HH:mm");
        }
      },
      { field: "duration", sortable: true, filter: true, width: 140 },
      {
        field: "customer",
        sortable: true,
        filter: true,
        width: 200,
        valueFormatter: (params) => {
          if (!params.value) {
            return "";
          }
          return `${params.value.firstname || ""} ${params.value.lastname || ""}`;
        }
      },
      {
        cellRenderer: (params) => (
          <Button
            size="small"
            color="error"
            onClick={() => deleteTraining(params)}
          >
            Delete
          </Button>
        ),
        width: 120
      }
    ]);
  
    useEffect(() => fetchData(), []);
  
    const fetchData = () => {
      fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then((res) => res.json())
        .then((data) => {
          setTrainings(data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    };
  
    const deleteTraining = (params) => {
        const id = params.data.id;
        if (window.confirm("Are you sure?")) {
          fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, {
            method: "DELETE"
          })
            .then((response) => {
              if (response.ok) {
                setMsg("Training deleted successfully");
                setOpen(true);
                fetchData();
              } else {
                alert("Something went wrong in deletion");
              }
            })
            .catch((err) => console.error(err));
        }
    };
      
    return (
      <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            className="ag-theme-material"
            style={{ width: "60%", height: 600, margin: "auto" }}
          >
            <AgGridReact
              rowData={trainings}
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
        )}
      </>
    );
  }

  export default TrainingList;