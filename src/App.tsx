import './App.css';

import Container from '@mui/material/Container';
import { Grid, Paper } from '@mui/material';
import Users from './pages/Users';
import Map from './pages/Map';
import { useState } from 'react';
import { Vehicle } from './services/CarService';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <DataProvider>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
              <Users />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
              <Map />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DataProvider>
  );
}

export default App;
