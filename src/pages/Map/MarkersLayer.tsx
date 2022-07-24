import { useEffect, useState } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import CarService, { User, VehicleLocation } from "../../services/CarService";
import { Popup, useMap, useMapEvents } from 'react-leaflet';
import { LatLngTuple } from "leaflet";
import CarMarker from "./components/VehicleMarker";
import { useSnackbar } from "notistack";
import VehicleCard from "../../components/VehicleCard";

const MarkersLayer = ({ currentUser }: {
    currentUser: User
}) => {
    const { enqueueSnackbar } = useSnackbar();
    const { currentVehicle } = useDataProvider();

    const map = useMap();
    const mapEvents = useMapEvents({});

    const [locations, setLocations] = useState<VehicleLocation[] | undefined>(undefined);

    useEffect(() => {
        if (!locations) {
            return;
        }

        if (locations.length > 1) {
            const bonds: LatLngTuple[] = locations.map(loc => [loc.lat, loc.lon] as LatLngTuple);
            map.fitBounds(bonds, { maxZoom: 16 });
        } else {
            map.setView([locations[0].lat, locations[0].lon], 16);
        }
    }, [locations]);

    useEffect(() => {
        const loadLocations = async (userId: number) => {
            try {
                const locations = await CarService.GetVehicleLocations(userId);
                setLocations(locations);
            } catch (e: any) {
                enqueueSnackbar(e.message, { variant: "error" });
            }
        };

        loadLocations(currentUser.userid);

        const intervalId = setInterval(() => {
            loadLocations(currentUser.userid);
        }, 1000 * 60);

        return () => {
            clearInterval(intervalId);
        };
    }, [currentUser]);

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
                        currentVehicle &&
                        currentVehicle.vehicleid === vehicle.vehicleid &&
                        <Popup>
                            <VehicleCard vehicle={vehicle} location={location} />
                        </Popup>
                    }
                </CarMarker>
        })
    }</>
}

export default MarkersLayer;