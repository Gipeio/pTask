import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../redux/userSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Gestionnaire de Tâches
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/tasks">Tâches</Button>
            <Button color="inherit" component={Link} to="/create-task">Créer Tâche</Button>
            <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Connexion</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
