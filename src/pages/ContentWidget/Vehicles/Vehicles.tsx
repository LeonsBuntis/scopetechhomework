import { List } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDataProvider } from "../../../contexts/DataContext";
import { VehicleListItem } from "./components/VehicleListItem";

const Vehicles = () => {

    const { currentUser, setCurrentUserId } = useDataProvider();

    const { userId } = useParams();

    useEffect(() => {
        const userIdOrUndefined = Number(userId) || undefined;
        setCurrentUserId(userIdOrUndefined);
    }, [userId])

    return currentUser
        ? <List component="div" disablePadding>
            {currentUser.vehicles.map(vehicle => <VehicleListItem vehicle={vehicle} key={vehicle.vehicleid} />)}
        </List>
        : <></>
}

export default Vehicles;