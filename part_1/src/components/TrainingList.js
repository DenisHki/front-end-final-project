import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const TrainingList = () => {
    const [trainings, setTrainings] = useState([]);

    const [columns] = useState([
        {field:'activity', sortable: true, filter: true, width: 140},
        {field:'date', sortable: true, filter: true, width: 150, valueFormatter: (params) => {
            return dayjs(params.value).format('DD.MM.YYYY HH:mm');
        }},
        {field:'duration', sortable: true, filter: true, width: 140},
        {field:'customer', sortable: true, filter: true, width: 140, cellRenderer: (params) => {
            const customer = params.data.customer;
            return customer ? `${customer.firstname} ${customer.lastname}` : '';
          },}
    ]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings')
        .then(response => response.json())
        .then(data => {
            const trainings = data.content;
            const promises = trainings.map(training => {
                return fetch(training.links.find(link => link.rel === 'customer').href)
                    .then(response => response.json())
                    .then(customer => {
                        training.customer = customer;
                        return training;
                    });
            });
            Promise.all(promises).then(updatedTrainings => {
                setTrainings(updatedTrainings);
            });
        });
    }

    return (
       <>
         <div
           className='ag-theme-material'
           style={{width:'80%', height:600, margin:'auto'}}>
           <AgGridReact
             rowData={trainings} 
             columnDefs={columns}
             pagination={true}
             paginationPageSize={10} 
           />
         </div>
       </> 
    );
}

export default TrainingList;