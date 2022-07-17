import { useEffect, useMemo, useState } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import CarService, { User, Vehicle, VehicleLocation } from "../../services/CarService";

export const Map = () => {

    const { userId, vehicle } = useDataProvider();

    const [locations, setLocations] = useState<VehicleLocation[] | []>([]);

    useEffect(() => {
        const loadLocations = async (userId: string) => {
            const locations = await CarService.GetVehicleLocations(userId);
            setLocations(locations);
        }

        if (userId){
            loadLocations(userId);
        }

    }, [userId, vehicle]);

    return userId && vehicle && locations && locations.length > 0
        ? <>
            <h1>UserId: {userId}</h1>
            <p>vehicle: {vehicle.vehicleid}</p>
            {locations.map(location => <p>{location.lat} {location.lon}</p>)}
        </>
        : <>
            <p>Please select vehicle</p>
        </>;
}