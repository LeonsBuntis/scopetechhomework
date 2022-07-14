import { useEffect, useState } from 'react';
import './App.css';
import CarService, { User } from './services/CarService';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function App() {

  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    const load = async () => {
      const users = await CarService.GetUsersWithVehicles();
      setUsers(users);
    };
    load();

    return () => { };
  }, [])


  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App example with TypeScript
        </Typography>
        <div className="App">
          {users.map(user =>
            <div key={user.userid}>
              <p>{user.owner.name} {user.owner.surname}</p>
              <ul>
                {user.vehicles.map(vehicle => <li key={vehicle.vin}>{vehicle.model} {vehicle.make}</li>)}
              </ul>
            </div>
          )}
        </div>
      </Box>
    </Container>
  );
}

export default App;
