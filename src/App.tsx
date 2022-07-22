import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import Layout from './components/Layout';
import Map from './pages/Map';
import ContentWidget from './pages/ContentWidget/';
import Users from './pages/ContentWidget/Users';
import Vehicles from './pages/ContentWidget/Vehicles';
import VehicleInfo from './pages/ContentWidget/VehicleInfo';

function App() {
  return (
    <DataProvider>
      <Layout>

        <Routes>
          <Route element={<ContentWidget />}>
            <Route path="/" element={<Navigate to="users" />} />

            <Route path="users" element={<Users />} />
            <Route path="users/:userId">
              <Route path="vehicles" element={<Vehicles />} />
              <Route path="vehicles/:vehicleId" element={<VehicleInfo />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>

        <Map />
      </Layout>
    </DataProvider>
  );
}

export default App;
