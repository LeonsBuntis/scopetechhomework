import { Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { GetColorName } from "hex-color-to-color-name";
import { useEffect, useState } from "react";
import { Popup } from "react-leaflet";
import VehicleCard from "../../../components/VehicleCard";
import { Vehicle } from "../../../services/CarService";
import NominatimService from "../../../services/NominatimService";

const CarTooltip = ({ vehicle }: {
    vehicle: Vehicle
}) => {

    return <Popup>
        <VehicleCard vehicle={vehicle} />
    </Popup>
}

export default CarTooltip;