import { useEffect, useMemo, useState } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import CarService, { User, Vehicle, VehicleLocation } from "../../services/CarService";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const icon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow
});

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

    // const position = [51.505, -0.09] as LatLngExpression;

    // return userId && vehicle && locations && locations.length > 0
    //     ? <>
    //         <h1>UserId: {userId}</h1>
    //         <p>vehicle: {vehicle.vehicleid}</p>
    //         {locations.map(location => <p>{location.lat} {location.lon}</p>)}

    //     </>
    //     : <>
    //         <p>Please select vehicle</p>
    //     </>;

    return <div style={{ height: '700px' }}>
        {userId && vehicle && locations && locations.length > 0
            && <><h1>UserId: {userId}</h1>
                <p>vehicle: {vehicle.vehicleid}</p>
                {locations.map(location => <p>{location.lat} {location.lon}</p>)}
            </>}
        <MapContainer style={{ height: '100%' }} center={[56.9496, 24.1052]} zoom={12} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                userId && vehicle && locations && locations.length > 0 &&
                locations.map(location =>
                    <Marker position={[location.lat, location.lon]} icon={icon}>
                        <Popup>
                            {location.vehicleid}
                        </Popup>
                    </Marker>)
            }
        </MapContainer>
    </div>
}