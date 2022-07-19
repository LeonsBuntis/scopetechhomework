import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Collapse, List, Divider } from "@mui/material";
import { useReducer } from "react";
import { useDataProvider } from "../../../contexts/DataContext";
import { User } from "../../../services/CarService";
import { VehicleComponent } from "./VehicleComponent";

export const UserComponent = ({ user }: { user: User }): JSX.Element => {

    const { setUserId } = useDataProvider();

    const [showVehicles, toggleVehicles] = useReducer(prev => !prev, true);

    const handleVehicleChanged = (userId: string) => {
        setUserId(userId);
    }

    const selectUser = (userId: string) => () => {
        setUserId(userId);
        // toggleVehicles();
    }

    return (
        <>
            <ListItem alignItems="flex-start" >
                <ListItemButton onClick={selectUser(user.userid)}>
                    <ListItemAvatar>
                        <Avatar
                            alt={`${user.owner.name} ${user.owner.surname}`}
                            src={user.owner.foto}
                        />
                    </ListItemAvatar>
                    <ListItemText primary={`${user.owner.name} ${user.owner.surname} (${user.vehicles.length})`} />
                    {
                        showVehicles
                            ? <ExpandLess />
                            : <ExpandMore />
                    }
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
