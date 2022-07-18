import { useEffect, useMemo, useState } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import CarService, { User, Vehicle, VehicleLocation } from "../../services/CarService";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L, { LatLngBoundsExpression, LatLngTuple } from "leaflet";

import 'leaflet/dist/leaflet.css';

import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const icon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow
});

const MarkerDisplay = ({ locations }: {
    locations: VehicleLocation[]
}) => {

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
    }, [locations]);

    return <>
        {locations.map(location =>
            <Marker position={[location.lat, location.lon]} icon={icon} key={location.vehicleid}>
                <Popup>
                    {location.vehicleid}
                </Popup>
            </Marker>)}
    </>
}

export const Map = () => {

    const { userId, vehicle } = useDataProvider();

    const [locations, setLocations] = useState<VehicleLocation[] | []>([]);

    useEffect(() => {
        const loadLocations = async (userId: string) => {
            const locations = await CarService.GetVehicleLocations(userId);
            setLocations(locations);
        }

        if (userId) {
            loadLocations(userId);
        }

    }, [userId, vehicle]);

    return <div style={{ height: '700px' }}>
        <MapContainer style={{ height: '100%' }} center={[56.9496, 24.1052]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                userId && 
                vehicle && 
                locations && 
                locations.length > 0 &&
                <MarkerDisplay locations={locations} />
            }
        </MapContainer>
    </div>
}