import './App.css';

import Container from '@mui/material/Container';
import { Grid, Paper } from '@mui/material';
import Users from './pages/Users';

function App() {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', }}>
            <Users />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
