import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, List } from "@mui/material";
import React, { useState, useEffect } from "react";
import CarService, { User } from "../../services/CarService";

const UserComponent = ({ user }: { user: User }): JSX.Element => {
    return (
        <>
            <ListItem alignItems="flex-start" >
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
    );
}


export const UserList = () => {

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
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {users.map(user => <UserComponent user={user} key={user.userid} />)}
        </List>
        /*  {users.map(user =>
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
        )}  */
    );
}