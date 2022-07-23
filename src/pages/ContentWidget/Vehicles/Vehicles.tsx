import { Box, Button, List } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDataProvider } from "../../../contexts/DataContext";
import { VehicleListItem } from "./components/VehicleListItem";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Vehicles = () => {

    const { currentUser, setCurrentUserId } = useDataProvider();
    const navigate = useNavigate();

    const { userId } = useParams();

    useEffect(() => {
        const userIdOrUndefined = Number(userId) || undefined;
        setCurrentUserId(userIdOrUndefined);
    }, [userId])

    return currentUser
        ? <>
            <Box>
                <Button variant="text" onClick={() => navigate('/users')}><ChevronLeftIcon />Back</Button>
            </Box>
            <List component="div" disablePadding>
                {currentUser.vehicles.map(vehicle => <VehicleListItem vehicle={vehicle} key={vehicle.vehicleid} />)}
            </List>
        </>
        : <></>
}

export default Vehicles;