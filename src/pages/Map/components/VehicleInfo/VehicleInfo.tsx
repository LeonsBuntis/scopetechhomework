import { Box, Container, Stack } from "@mui/material"
import { useEffect, useState } from "react";
import VehicleCard from "../VehicleCard";
import { useLocationProvider } from "../../../../contexts/LocationsContext";
import { useUserProvider } from "../../../../contexts/UserContext";
import { useMappedParams } from "../../../../hooks/useMappedParams";
import { Vehicle, VehicleLocation } from "../../../../services/CarService";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useCustomNavigate } from "../../../../hooks/useCustomNavigate";

export const VehicleInfo = () => {
    const { vehicleId, userId } = useMappedParams();
    const { users } = useUserProvider();
    const { locations } = useLocationProvider();
    const { navigateToUser } = useCustomNavigate();

    const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
    const [location, setLocation] = useState<VehicleLocation | undefined>(undefined);

    useEffect(() => {
        if (!vehicleId || !userId) {
            setVehicle(undefined);
            setLocation(undefined);
        }

        const vehicle = users?.find(u => u.userid === userId)?.vehicles?.find(v => v.vehicleid === vehicleId);
        setVehicle(vehicle);

        const location = locations?.find(l => l.vehicleid === vehicleId);
        setLocation(location);
    }, [users, locations, vehicleId, userId]);

    return vehicle && location ?
        <Container disableGutters maxWidth="xs" sx={{
            position: "absolute",
            p: 2,
            pr: 20,
            overflow: "auto",
            zIndex: "1000"
        }}>
            <Stack sx={{
                bgcolor: 'background.paper',
                borderRadius: 1,
                p: 2
            }}>
                <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                    <IconButton component="label" onClick={() => navigateToUser(userId)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <VehicleCard vehicle={vehicle} location={location} />
            </Stack >
        </Container> :
        <></>
}