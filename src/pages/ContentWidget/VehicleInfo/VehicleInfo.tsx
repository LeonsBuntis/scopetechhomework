import { Box } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import VehicleCard from "../../../components/VehicleCard";
import { useDataProvider } from "../../../contexts/DataContext";

const VehicleInfo = () => {

    const { currentVehicle, setCurrentVehicleId, setCurrentUserId } = useDataProvider();
    const { userId, vehicleId } = useParams();

    useEffect(() => {
        const userIdOrUndefined = Number(userId) || undefined;
        const vehicleIdOrUndefined = Number(vehicleId) || undefined;
        setCurrentUserId(userIdOrUndefined);
        setCurrentVehicleId(vehicleIdOrUndefined);

    }, [ userId, vehicleId]);

    return currentVehicle
        ? <Box alignContent={"center"} sx={{}}><VehicleCard vehicle={currentVehicle} /></Box>
        : <>Loading</>
}

export default VehicleInfo;