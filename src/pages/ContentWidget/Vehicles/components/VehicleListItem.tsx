import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import { useDataProvider } from "../../../../contexts/DataContext";
import { useCustomNavigate } from "../../../../hooks/useCustomNavigate";
import { Vehicle } from "../../../../services/CarService";

export const VehicleListItem = ({ vehicle }: {
    vehicle: Vehicle
}) => {
    const { currentVehicleId } = useDataProvider();
    const { navigateToVehicle } = useCustomNavigate();

    const handleVehicleClicked = (vehicle: Vehicle) => () => {
        navigateToVehicle(vehicle.vehicleid);
    }

    return (
        <>
            <ListItem alignItems="flex-start" sx={{ pl: 4 }}>
                <ListItemButton onClick={handleVehicleClicked(vehicle)} selected={currentVehicleId === vehicle.vehicleid}>
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
