import './App.css';

import Container from '@mui/material/Container';
import { Grid, Paper } from '@mui/material';
import Users from './pages/Users';
import Map from './pages/Map';
import { DataProvider } from './contexts/DataContext';
import DashboardContent from './components/layout/Dashboard';

function App() {
  return (
    <DataProvider>
      <DashboardContent>
        <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
              <Map />
            </Paper>
          </Grid>
        </Container>
      </DashboardContent>
    </DataProvider>
  );
}

export default App;
