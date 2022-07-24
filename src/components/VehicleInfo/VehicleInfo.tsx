import { Container, Stack } from "@mui/material"
import VehicleCard from "../VehicleCard"
import { Vehicle, VehicleLocation } from "../../services/CarService";
import { useMappedParams } from "../../hooks/useMappedParams";
import { useUserProvider } from "../../contexts/UserContext";
import { useLocationProvider } from "../../contexts/LocationsContext";
import { useEffect, useState } from "react";

export const VehicleInfo = () => {
    const { vehicleId, userId } = useMappedParams();
    const { users } = useUserProvider();
    const { locations } = useLocationProvider();

    const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
    const [location, setLocation] = useState<VehicleLocation | undefined>(undefined);

    useEffect(() => {
        if (!vehicleId) {
            setVehicle(undefined);
        }

        const vehicle = users?.find(u => u.userid === userId)?.vehicles?.find(v => v.vehicleid === vehicleId);
        setVehicle(vehicle);

        const location = locations?.find(l => l.vehicleid === vehicleId);
        setLocation(location);
    }, [users, locations, vehicleId]);

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
                <VehicleCard vehicle={vehicle} location={location} />
            </Stack >
        </Container> :
        <></>
}