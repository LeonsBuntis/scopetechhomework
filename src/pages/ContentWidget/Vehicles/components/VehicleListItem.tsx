import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import { useCustomNavigate } from "../../../../hooks/useCustomNavigate";
import { useMappedParams } from "../../../../hooks/useMappedParams";
import { Vehicle } from "../../../../services/VehicleService";

export const VehicleListItem = ({ vehicle }: {
    vehicle: Vehicle
}) => {
    const { vehicleId } = useMappedParams();
    const { navigateToVehicle } = useCustomNavigate();

    const handleVehicleClicked = (vehicle: Vehicle) => () => {
        navigateToVehicle(vehicle.vehicleid);
    }

    return (
        <>
            <ListItem alignItems="flex-start" sx={{ pl: 4 }}>
                <ListItemButton onClick={handleVehicleClicked(vehicle)} selected={vehicleId === vehicle.vehicleid}>
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
