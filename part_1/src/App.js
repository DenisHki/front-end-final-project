import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Router from './UI/Router';

function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">PersonalTrainer</Typography>
        </Toolbar>
      </AppBar>
      <Router />
    </div>
  );
}

export default App;
