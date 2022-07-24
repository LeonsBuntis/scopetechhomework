import './App.css';

import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import Map from './pages/Map';
import ContentWidget from './pages/ContentWidget/';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <DataProvider>
        <Layout>
          <ContentWidget />
          <Map />
        </Layout>
      </DataProvider>
    </SnackbarProvider>
  );
}

export default App;
