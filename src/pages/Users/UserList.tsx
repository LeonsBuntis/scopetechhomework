import { StarBorder } from "@mui/icons-material";
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, List, ListItemButton, Collapse, ListItemIcon } from "@mui/material";
import React, { useState, useEffect, useReducer } from "react";
import CarService, { User, Vehicle } from "../../services/CarService";
import { GetColorName } from 'hex-color-to-color-name';

const VehicleComponent = ({ vehicle }: { vehicle: Vehicle }) => {
    const displayCoordinates = (vehicle: Vehicle) => () => {
        console.log(vehicle);
    }

    return (
        <>
            <ListItem alignItems="flex-start" >
                <ListItemButton onClick={displayCoordinates(vehicle)}>
                    <ListItemAvatar>
                        <Avatar
                            alt={`${vehicle.make} ${vehicle.model}`}
                            src={vehicle.foto}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${vehicle.make} ${vehicle.model} (${GetColorName(vehicle.color)})`}
                        secondary={
                            <>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {vehicle.year}
                                </Typography>
                                {` — ${vehicle.vin}`}
                            </>
                        }
                    />
                </ListItemButton>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}

const VehicleList = ({ initVehicles }: { initVehicles: Vehicle[] }) => {
    const [vehicles, setVehicles] = useState(initVehicles);

    return vehicles.map(vehicle => <VehicleComponent vehicle={vehicle} />);
}

const UserComponent = ({ user }: { user: User }): JSX.Element => {

    // const [vehicles, setVehicles] = useState<Vehicle[] | []>([]);

    const [showVehicles, toggleVehicles] = useReducer(prev => !prev, false);

    return (
        <>
            <ListItem alignItems="flex-start" >
                <ListItemButton onClick={toggleVehicles}>
                    <ListItemAvatar>
                        <Avatar
                            alt={`${user.owner.name} ${user.owner.surname}`}
                            src={user.owner.foto}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${user.owner.name} ${user.owner.surname} (${user.vehicles.length})`}
                        // secondary={
                        //     <>
                        //         <Typography
                        //             sx={{ display: 'inline' }}
                        //             component="span"
                        //             variant="body2"
                        //             color="text.primary"
                        //         >
                        //             Vehicles ({user.vehicles.length})
                        //         </Typography>
                        //         {" — click to view vehicles"}
                        //     </>
                        // }
                    />
                </ListItemButton>
            </ListItem>
            <Collapse in={showVehicles} timeout="auto" unmountOnExit>
                {user.vehicles.map(vehicle => <VehicleComponent vehicle={vehicle} key={vehicle.vehicleid} />)}
            </Collapse>
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