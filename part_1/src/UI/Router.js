import React from 'react';
import CustomerList from '../components/CustomerList';
import TrainingList from '../components/TrainingList';
import NotFound from '../components/NotFound';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

const Router = () => {
    
    return (
      <div>
      <BrowserRouter>
       <nav>
         <NavLink to="/" activeclassname="active">Customers</NavLink>{' '}
         <NavLink to="/trainings" activeclassname="active">Trainings</NavLink>{' '}
       </nav>
       <Routes>
         <Route path="/" element={<CustomerList/>} />
         <Route path="/trainings" element={<TrainingList/>} />
         <Route path="*" element={<NotFound/>} />
       </Routes>
      </BrowserRouter>
     </div>
    );
}

export default Router;