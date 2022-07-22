import { useEffect } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import { VehicleLocation } from "../../services/CarService";
import { useMap } from 'react-leaflet';
import { LatLngTuple } from "leaflet";
import CarMarker from "./components/CarMarker";

const VehicleMarkers = () => {

    const { vehicles } = useDataProvider();
    const map = useMap();

    useEffect(() => {
        const locations = vehicles?.map(v => v.location as VehicleLocation);
        if (!locations) {
            return;
        }

        if (locations.length > 1) {
            const bonds: LatLngTuple[] = locations.map(loc => [loc.lat, loc.lon] as LatLngTuple);

            console.log(`fit bonds`);

            map.fitBounds(bonds);
        } else {
            console.log(`set view ${locations[0].lat} ${locations[0].lon}`);

            map.setView([locations[0].lat, locations[0].lon], 16);
        }
    }, [vehicles]);

    return <>{
        vehicles &&
        vehicles.map(vehicle => <CarMarker vehicle={vehicle} key={vehicle.vehicleid} />)
    }</>
}

export default VehicleMarkers;