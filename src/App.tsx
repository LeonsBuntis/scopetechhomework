import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import Map from './pages/Map';
import ContentWidget from './pages/ContentWidget/';
import Users from './pages/ContentWidget/Users';
import Vehicles from './pages/ContentWidget/Vehicles';

function App() {
  return (
    <DataProvider>
      <Layout>
        <ContentWidget />
        <Map />
      </Layout>
    </DataProvider>
  );
}

export default App;
