import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import { useDataProvider } from "../../../contexts/DataContext";
import { Vehicle } from "../../../services/CarService";

export const VehicleComponent = ({ vehicle, vehicleSelected }: { 
    vehicle: Vehicle,
    vehicleSelected: () => void
}) => {
    const { vehicleId, setVehicleId } = useDataProvider();

    const handleVehicleClicked = (vehicle: Vehicle) => () => {
        setVehicleId(vehicle.vehicleid);
        vehicleSelected();
    }

    return (
        <>
            <ListItem alignItems="flex-start" sx={{ pl: 4 }} selected={vehicleId === vehicle.vehicleid}>
                <ListItemButton onClick={handleVehicleClicked(vehicle)}>
                    <ListItemAvatar>
                        <Avatar
                            alt={`${vehicle.make} ${vehicle.model} ${GetColorName(vehicle.color)}`}
                            src={vehicle.foto}
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${vehicle.make} ${vehicle.model} (${GetColorName(vehicle.color)})`}
                        secondary={
                            <>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {vehicle.year}
                                </Typography>
                                {` — ${vehicle.vin}`}
                            </>
                        }
                    />
                </ListItemButton>
            </ListItem>
        </>
    );
}
