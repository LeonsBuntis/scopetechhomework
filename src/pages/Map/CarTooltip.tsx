import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { GetColorName } from "hex-color-to-color-name";
import { useEffect, useState } from "react";
import { Popup, Tooltip } from "react-leaflet";
import { Vehicle } from "../../services/CarService";
import NominatimService from "../../services/NominatimService";

const CarTooltip = ({ vehicle }: {
    vehicle: Vehicle
}) => {

    const [locationName, setLocationName] = useState<string>('');

    useEffect(() => {
        (async () => {
            console.log('kozlik');

            const name = await NominatimService.GetLocationName(vehicle.location.lat, vehicle.location.lon);

            setLocationName(name);
        })();

    }, [vehicle]);

    return <Popup>
        <Card variant="outlined" sx={{ maxWidth: 250, border: 0, borderRadius: 0, marginTop: '1rem' }}>
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

                <Divider sx={{margin: '1rem 0'}} />

                <Typography
                    component="span"
                    variant="body1" >
                    {locationName}
                </Typography>

            </CardContent>
        </Card>
    </Popup>
}

export default CarTooltip;