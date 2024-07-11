import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Gestionnaire de Tâches
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
