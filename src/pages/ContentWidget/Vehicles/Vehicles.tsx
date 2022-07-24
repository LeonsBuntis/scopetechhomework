import { Box, Button, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useDataProvider } from "../../../contexts/DataContext";
import { VehicleListItem } from "./components/VehicleListItem";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { User } from "../../../services/CarService";
import { useCustomNavigate } from "../../../hooks/useCustomNavigate";

const Vehicles = () => {

    const { users, currentUserId } = useDataProvider();
    const { navigateToUsers } = useCustomNavigate();

    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const user = users?.find(user => user.userid === currentUserId);

        setCurrentUser(user);
    }, [currentUserId]);

    return currentUser
        ? <>
            <Box>
                <Button variant="text" onClick={navigateToUsers}><ChevronLeftIcon />Back</Button>
            </Box>
            <List component="div" disablePadding>
                {currentUser.vehicles.map(vehicle => <VehicleListItem vehicle={vehicle} key={vehicle.vehicleid} />)}
            </List>
        </>
        : <></>
}

export default Vehicles;