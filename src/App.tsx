import './App.css';

import { UserProvider } from './contexts/UserContext';
import Layout from './components/Layout';
import Map from './pages/Map';
import ContentWidget from './pages/ContentWidget/';
import { SnackbarProvider } from 'notistack';
import { LocationProvider } from './contexts/LocationsContext';
import VehicleInfo from './components/VehicleInfo';
import { Container } from '@mui/system';
import { Stack } from '@mui/material';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <UserProvider>
        <LocationProvider>
          <Layout>
            <Container disableGutters maxWidth={false}>
              <Stack direction="row">
                <ContentWidget />
                <Map />
              </Stack>
            </Container>
          </Layout>
        </LocationProvider>
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;
