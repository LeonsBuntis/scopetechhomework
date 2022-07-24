import { Container, Stack } from "@mui/material"
import VehicleCard from "../VehicleCard"
import { Vehicle, VehicleLocation } from "../../services/CarService";

export const VehicleInfo = ({ vehicle, location }: {
    vehicle: Vehicle,
    location: VehicleLocation
}) => {
    return vehicle &&
        location &&
        <Container disableGutters maxWidth="xs" sx={{
            position: "absolute",
            p: 1,
            height: "100vh",
            overflow: "auto",
            zIndex: "1000"
        }}>
            <Stack sx={{
                minHeight: "98vh",
                bgcolor: 'background.paper',
                borderRadius: 1,
                p: 2
            }}>
                <VehicleCard vehicle={vehicle} location={location} />
            </Stack >
        </Container>
}