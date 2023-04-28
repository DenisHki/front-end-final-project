import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Router from './UI/Router';

function App() {
  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">PersonalTrainer</Typography>
        </Toolbar>
      </AppBar>
      <Router/>
      
    </div>
  );
}

export default App;