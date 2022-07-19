import { useEffect, useMemo, useState } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import CarService, { User, Vehicle, VehicleLocation } from "../../services/CarService";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { LatLngBoundsExpression, LatLngTuple } from "leaflet";
import RoomIcon from '@mui/icons-material/Room';
import { renderToString } from 'react-dom/server';
import Icon from '@mui/material/Icon';

import './CarMarker.css';

const CarMarker = ({ vehicle }: {
    vehicle: Vehicle
}) => {

    const location = vehicle.location as VehicleLocation;

    const initIcon = L.divIcon({
        html: renderToString(<span className="material-icons" style={{color: vehicle.color, fontSize: 60}} aria-hidden="true">room</span>),
        iconAnchor: [0, 0],
        popupAnchor: [6, -43],
        className: "custom-icon-wrapper"
    });

    const [divIcon, setDivIcon] = useState<L.DivIcon>(initIcon);
    
    useEffect(() => {
        const newIcon = L.divIcon({
            html: renderToString(<span className="material-icons" style={{color: vehicle.color, fontSize: 60}} aria-hidden="true">room</span>),
            iconAnchor: [0, 0],
            popupAnchor: [6, -43],
            className: "custom-icon-wrapper"
        });
        setDivIcon(newIcon);
    }, [vehicle]);

    return <Marker position={[location.lat, location.lon]} icon={divIcon}>
        <Popup>
            {location.vehicleid}
        </Popup>
    </Marker>
};

export default CarMarker;