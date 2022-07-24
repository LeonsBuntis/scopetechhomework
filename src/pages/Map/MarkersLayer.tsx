import { useEffect, useState } from "react";
import CarService, { User, VehicleLocation } from "../../services/CarService";
import { Popup, useMap, useMapEvents } from 'react-leaflet';
import { LatLngTuple } from "leaflet";
import CarMarker from "./components/VehicleMarker";
import VehicleCard from "../../components/VehicleCard";
import { useMappedParams } from "../../hooks/useMappedParams";
import { useLocationProvider } from "../../contexts/LocationsContext";

const MarkersLayer = ({ currentUser }: {
    currentUser: User
}) => {
    const { vehicleId } = useMappedParams();
    const { locations } = useLocationProvider();

    const map = useMap();
    const mapEvents = useMapEvents({});

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

    }, [locations, vehicleId]);

    return <>{
        locations &&
        currentUser.vehicles &&
        currentUser.vehicles.map(vehicle => {
            const location = locations.find(l => l.vehicleid === vehicle.vehicleid);

            return location &&
                <CarMarker
                    key={vehicle.vehicleid}
                    markerColor={vehicle.color}
                    locationLat={location.lat}
                    locationLon={location.lon}
                    vehicleId={vehicle.vehicleid} >
                    {
                        <Popup>
                            <VehicleCard vehicle={vehicle} location={location} />
                        </Popup>
                    }
                </CarMarker>
        })
    }</>
}

export default MarkersLayer;