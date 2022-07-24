import { Card, CardMedia, CardContent, Typography, Divider } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import { useState, useEffect } from "react";
import { Vehicle, VehicleLocation } from "../../services/CarService";
import NominatimService from "../../services/NominatimService/NominatimService";

const VehicleCard = ({ vehicle, location }: {
    vehicle: Vehicle,
    location: VehicleLocation
}) => {

    const [locationName, setLocationName] = useState<string>('');

    useEffect(() => {
        (async () => {
            if (!location || !location.lat || !location.lon) {
                setLocationName('');
                return;
            }

            const name = await NominatimService.GetLocationName(location.lat, location.lon);

            setLocationName(name);
        })();

    }, [vehicle]);

    return <Card variant="outlined" sx={{ maxWidth: 250, border: 0, borderRadius: 0, marginTop: '1rem' }}>
        <CardMedia
            component="img"
            height="150"
            image={vehicle.foto}
            alt={`${vehicle.make} ${vehicle.model} ${vehicle.year} ${GetColorName(vehicle.color)}`}
        />
        <CardContent>
            <Typography variant="h5" component="div">
                {vehicle.make} {vehicle.model}
            </Typography>
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
            >
                {vehicle.year}
            </Typography>
            <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.secondary"
            >
                {` — ${vehicle.vin}`}
            </Typography>

            <Divider sx={{ margin: '1rem 0' }} />

            <Typography
                component="span"
                variant="body1" >
                {locationName}
            </Typography>

        </CardContent>
    </Card>
}


export default VehicleCard;