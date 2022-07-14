import { useEffect, useState } from 'react';
import './App.css';
import CarService, { User } from './services/CarService';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Avatar, Divider, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper } from '@mui/material';
import React from 'react';

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {users.map(user =>
                <>
                  <ListItem alignItems="flex-start" key={user.userid}>
                    <ListItemAvatar>
                      <Avatar
                        alt={`${user.owner.name} ${user.owner.surname}`}
                        src={user.owner.foto}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.owner.name} ${user.owner.surname}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Ali Connors
                          </Typography>
                          {" — I'll be in your neighborhood doing errands this…"}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </>
              )}
            </List>
            {/* {users.map(user =>
              <div key={user.userid}>
                <Avatar
                  alt={`${user.owner.name} ${user.owner.surname}`}
                  src={user.owner.foto}
                  sx={{ width: 56, height: 56 }} />
                <p>{user.owner.name} {user.owner.surname}</p>
                <ul>
                  {user.vehicles.map(vehicle => <li key={vehicle.vin}>{vehicle.model} {vehicle.make}</li>)}
                </ul>
              </div>
            )} */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
