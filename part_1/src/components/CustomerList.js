import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);
    
    const [columns] = useState([
        {field:'firstname', sortable: true, filter: true, width: 130},
        {field:'lastname', sortable: true, filter: true, width: 130},
        {field:'streetaddress', sortable: true, filter: true, width: 160},
        {field:'postcode', sortable: true, filter: true, width: 120},
        {field:'city', sortable: true, filter: true, width: 120},
        {field:'email', sortable: true, filter: true, width: 180},
        {field:'phone', sortable: true, filter: true, width: 140}
    ]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    return (
       <>
         <div
           className='ag-theme-material'
           style={{width:'80%', height:600, margin:'auto'}}>
           <AgGridReact
             rowData={customers} 
             columnDefs={columns}
             pagination={true}
             paginationPageSize={10} 
           />
         </div>
       </> 
    );
}

export default CustomerList;