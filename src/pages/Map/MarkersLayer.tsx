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
    const { currentVehicleId } = useDataProvider();

    const map = useMap();
    const mapEvents = useMapEvents({});

    const [locations, setLocations] = useState<VehicleLocation[] | undefined>(undefined);

    useEffect(() => {
        if (!locations) {
            return;
        }

        const currentVehicle = currentUser.vehicles?.find(vehicle => vehicle.vehicleid === currentVehicleId);

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

    }, [locations, currentVehicleId]);

    useEffect(() => {
        const loadLocations = async (userId: number) => {
            const locations = await CarService.GetVehicleLocations(userId);
            setLocations(locations);
        };

        loadLocations(currentUser.userid)
            .catch(e => {
                enqueueSnackbar(e.message, { variant: "error" });
            });

        const intervalId = setInterval(() => {
            loadLocations(currentUser.userid)
                .catch(e => {
                    enqueueSnackbar("Couldn't get new location", { variant: "warning" });
                });
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
                        currentVehicleId === vehicle.vehicleid &&
                        <Popup>
                            <VehicleCard vehicle={vehicle} location={location} />
                        </Popup>
                    }
                </CarMarker>
        })
    }</>
}

export default MarkersLayer;