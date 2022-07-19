import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Collapse, List, Divider } from "@mui/material";
import { useReducer } from "react";
import { useDataProvider } from "../../../contexts/DataContext";
import { User } from "../../../services/CarService";
import { VehicleComponent } from "./VehicleComponent";

export const UserComponent = ({ user }: { user: User }): JSX.Element => {

    const { userId, setUserId, setVehicleId } = useDataProvider();

    const [showVehicles, toggleVehicles] = useReducer(prev => !prev, true);

    const handleVehicleChanged = (userId: string) => {
        setUserId(userId);
    }

    const selectUser = (userId: string) => () => {
        setUserId(userId);
        setVehicleId(undefined);
        // toggleVehicles();
    }

    const vehicleSelected = (userId: string) => {
        setUserId(userId);
    }

    return (
        <>
            <ListItem alignItems="flex-start" selected={userId === user.userid}>
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
                    {user.vehicles.map(vehicle => <VehicleComponent vehicleSelected={() => vehicleSelected(user.userid)} vehicle={vehicle} key={vehicle.vehicleid} />)}
                </List>
            </Collapse>
            <Divider variant="middle" component="li" />
        </>
    );
}
