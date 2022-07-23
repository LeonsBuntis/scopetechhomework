import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Link } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "../../../../contexts/DataContext";
import { Vehicle } from "../../../../services/CarService";

export const VehicleListItem = ({ vehicle }: {
    vehicle: Vehicle
}) => {

    const navigate = useNavigate();
    const { currentVehicle, setCurrentVehicleId } = useDataProvider();

    const handleVehicleClicked = (vehicle: Vehicle) => () => {
        if (!currentVehicle) {
            navigate(`${vehicle.vehicleid}`);
        } else if (currentVehicle.vehicleid === vehicle.vehicleid) {
            return;
        } else {
            navigate(`..`);
        }
    }

    return (
        <>
            <ListItem alignItems="flex-start" sx={{ pl: 4 }}>
                <ListItemButton onClick={handleVehicleClicked(vehicle)} selected={currentVehicle?.vehicleid === vehicle.vehicleid}>
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
