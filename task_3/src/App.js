import React from "react";
import "./App.css";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import MyCalendar from "./components/MyCalendar";
import NotFound from "./components/NotFound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar style={{ flexGrow: 1 }}>
            <Typography variant="h6">PersonalTrainer</Typography>

            <Typography
              variant="h6"
              className="App-bar"
              style={{ marginLeft: "auto" }}
            >
              <Link to="/">Customers</Link>
            </Typography>
            <Typography variant="h6" className="App-bar">
              <Link to="/trainings">Trainings</Link>
            </Typography>
            <Typography variant="h6" className="App-bar">
              <Link to="/calendar">Calendar</Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<MyCalendar />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
