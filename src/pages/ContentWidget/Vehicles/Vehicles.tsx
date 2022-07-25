import { Box, Button, List } from "@mui/material";
import { useEffect, useState } from "react";
import { useUserProvider } from "../../../contexts/UserContext";
import { VehicleListItem } from "./components/VehicleListItem";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { User } from "../../../services/VehicleService";
import { useCustomNavigate } from "../../../hooks/useCustomNavigate";
import { useMappedParams } from "../../../hooks/useMappedParams";

const Vehicles = () => {
    const { users } = useUserProvider();
    const { userId } = useMappedParams();
    const { navigateToUsers } = useCustomNavigate();

    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const user = users?.find(user => user.userid === userId);

        setCurrentUser(user);
    }, [users, userId]);

    return currentUser
        ? <>
            <Box>
                <Button variant="text" onClick={navigateToUsers}><ChevronLeftIcon />Back</Button>
            </Box>
            <List component="div" disablePadding>
                {currentUser.vehicles.map(vehicle => <VehicleListItem vehicle={vehicle} key={vehicle.vehicleid} />)}
            </List>
        </>
        : <>Couldn't load vehicles</>
}

export default Vehicles;