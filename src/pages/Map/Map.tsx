import { useEffect } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import { Vehicle, VehicleLocation } from "../../services/CarService";
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { LatLngTuple } from "leaflet";
import CarMarker from "./CarMarker";

import 'leaflet/dist/leaflet.css';

const MarkerDisplay = ({ vehicles }: {
    vehicles: Vehicle[]
}) => {

    const locations = vehicles.map(v => v.location as VehicleLocation);

    const map = useMap();
    useEffect(() => {
        if (locations.length > 1) {
            const bonds: LatLngTuple[] = locations.map(loc => [loc.lat, loc.lon] as LatLngTuple);

            console.log(`fit bonds`);

            map.fitBounds(bonds);
        } else {
            console.log(`set view ${locations[0].lat} ${locations[0].lon}`);

            map.setView([locations[0].lat, locations[0].lon], 16);
        }
    }, [vehicles]);

    return <>
        {vehicles.map(vehicle => <CarMarker vehicle={vehicle} key={vehicle.vehicleid} />)}
    </>
}

export const Map = () => {

    const { vehicles } = useDataProvider();

    return <div style={{ height: '81vh' }}>
        <MapContainer style={{ height: '100%' }} center={[56.9496, 24.1052]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                vehicles &&
                <MarkerDisplay vehicles={vehicles} />
            }
        </MapContainer>
    </div>
}