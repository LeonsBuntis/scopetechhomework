import './App.css';

import { UserProvider } from './contexts/UserContext';
import Layout from './components/Layout';
import Map from './pages/Map';
import ContentWidget from './pages/ContentWidget/';
import { SnackbarProvider } from 'notistack';
import { LocationProvider } from './contexts/LocationsContext';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <UserProvider>
        <LocationProvider>
          <Layout>
            <ContentWidget />
            <Map />
          </Layout>
        </LocationProvider>
      </UserProvider>
    </SnackbarProvider>
  );
}

export default App;
