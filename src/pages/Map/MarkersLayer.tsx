import { useEffect } from "react";
import { User } from "../../services/CarService";
import { useMap } from 'react-leaflet';
import { LatLngTuple } from "leaflet";
import CarMarker from "./components/VehicleMarker/VehicleMarker";
import { useMappedParams } from "../../hooks/useMappedParams";
import { useLocationProvider } from "../../contexts/LocationsContext";

const MarkersLayer = ({ currentUser }: {
    currentUser: User
}) => {
    const map = useMap();
    const { vehicleId } = useMappedParams();
    const { locations } = useLocationProvider();

    useEffect(() => {
        if (!locations) {
            return;
        }

        const currentVehicle = currentUser.vehicles?.find(vehicle => vehicle.vehicleid === vehicleId);

        if (!currentVehicle) {
            if (locations.length > 1) {
                const bonds: LatLngTuple[] = locations.map(loc => [loc.lat, loc.lon] as LatLngTuple);
                map.fitBounds(bonds, { maxZoom: 15 });
            } else {
                map.setView([locations[0].lat, locations[0].lon], 15);
            }
        } else {
            const currentVehicleLocation = locations.find(loc => currentVehicle.vehicleid === loc.vehicleid);
            if (!currentVehicleLocation) {
                return;
            }

            map.setView([currentVehicleLocation.lat, currentVehicleLocation.lon], 15);
        }

    }, [locations, vehicleId, currentUser.vehicles, map]);

    return <>{
        locations &&
        locations.length > 0 &&
        currentUser.vehicles &&
        currentUser.vehicles.length > 0 &&
        currentUser.vehicles.map(vehicle => {
            const location = locations.find(l => l.vehicleid === vehicle.vehicleid);

            return location &&
                <CarMarker
                    key={vehicle.vehicleid}
                    markerColor={vehicle.color}
                    locationLat={location.lat}
                    locationLon={location.lon}
                    vehicleId={vehicle.vehicleid} >
                </CarMarker>
        })
    }</>
}

export default MarkersLayer;