import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Collapse, List, Divider } from "@mui/material";
import { useReducer } from "react";
import { User } from "../../../services/CarService";
import { VehicleComponent } from "./VehicleComponent";

export const UserComponent = ({ user }: { user: User }): JSX.Element => {

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
                    {showVehicles ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </ListItem>
            <Collapse in={showVehicles} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {user.vehicles.map(vehicle => <VehicleComponent vehicle={vehicle} key={vehicle.vehicleid} />)}
                </List>
            </Collapse>
            <Divider variant="middle" component="li" />
        </>
    );
}
