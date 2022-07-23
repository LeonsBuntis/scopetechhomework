import { useEffect, useState } from "react";
import { useDataProvider } from "../../../contexts/DataContext";
import { Vehicle, VehicleLocation } from "../../../services/CarService";
import { Marker, Tooltip } from 'react-leaflet';
import L from "leaflet";
import { renderToString } from 'react-dom/server';

import './CarMarker.css';
import CarTooltip from "./CarTooltip";

const CarMarker = ({ vehicle }: {
    vehicle: Vehicle
}) => {

    const { currentVehicle, setCurrentVehicleId } = useDataProvider();

    const location = vehicle.location as VehicleLocation;

    const createDivIcon = (color: string, selected: boolean = false) => {
        return L.divIcon({
            html: renderToString(<span className="material-icons" style={{ color: color, fontSize: 60 }} aria-hidden="true">room</span>),
            iconAnchor: [0, 0],
            popupAnchor: [6, -43],
            tooltipAnchor: [6, -43],
            className: "custom-icon-wrapper"
        });
    }

    const [divIcon, setDivIcon] = useState<L.DivIcon>(createDivIcon(vehicle.color));

    useEffect(() => {
        const newIcon = createDivIcon(vehicle.color);
        setDivIcon(newIcon);
    }, [vehicle]);

    return <Marker
        position={[location.lat, location.lon]}
        icon={divIcon}
        eventHandlers={{
            click: e => {
                console.log('marker clicked');
                setCurrentVehicleId(vehicle.vehicleid);
            }
        }}>
        {
            currentVehicle &&
            currentVehicle.vehicleid === vehicle.vehicleid &&
            <CarTooltip vehicle={vehicle} />
        }
    </Marker>
};

export default CarMarker;