import './App.css';

import { UserProvider } from './contexts/UserContext';
import Layout from './components/Layout';
import Map from './pages/Map';
import ContentWidget from './pages/ContentWidget/';
import { SnackbarProvider } from 'notistack';
import { LocationProvider } from './contexts/LocationsContext';
import { LoadingProvider } from './contexts/LoadingContext';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <LoadingProvider>
        <UserProvider>
          <LocationProvider>
            <Layout>
              <ContentWidget />
              <Map />
            </Layout>
          </LocationProvider>
        </UserProvider>
      </LoadingProvider>
    </SnackbarProvider>
  );
}

export default App;
