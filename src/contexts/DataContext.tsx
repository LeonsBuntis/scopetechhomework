import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import CarService, { User, Vehicle, VehicleLocation } from "../services/CarService";

export interface DataContextProps {
    userId: string | undefined,
    vehicleId: string | undefined,
    users: User[] | undefined,
    vehicles: Vehicle[] | undefined,
    setUserId: (userId: string | undefined) => void,
    setVehicleId: (vehicleId: string | undefined) => void,
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = (props: PropsWithChildren<{}>) => {
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [vehicleId, setVehicleId] = useState<string | undefined>(undefined);

    const [users, setUsers] = useState<User[] | undefined>(undefined);
    const [locations, setLocations] = useState<VehicleLocation[] | undefined>(undefined);

    const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            const response = await CarService.GetUsersWithVehicles();
            setUsers(response);
        })();

        return () => { };
    }, []);

    useEffect(() => {
        const loadLocations = async (userId: string) => {
            const locations = await CarService.GetVehicleLocations(userId);
            if (!users) {
                throw new Error("users undefined");
            }
            const user = users.find(user => user.userid === userId);
            if (!user) {
                throw new Error("Could not find user");
            }
            const vehiclesToDisplay: Vehicle[] = [];
            locations.forEach(location => {
                if(!location.lat || !location.lon){
                    return;
                }

                const v = user.vehicles.find(vehicle => vehicle.vehicleid === location.vehicleid);
                if (v) {
                    vehiclesToDisplay.push({ ...v, location: location });
                }
            });

            setLocations(locations);
            setVehicles(vehiclesToDisplay);
        };

        if (userId) {
            loadLocations(userId);
        }

        return () => { };
    }, [userId])


    return <DataContext.Provider value={{ userId, vehicleId, users, vehicles, setUserId, setVehicleId }} {...props} />;
}

export const useDataProvider = (): DataContextProps => {
    const ctx = useContext(DataContext);
    if (ctx === undefined) {
        throw new Error("useCtx must be inside a Provider with a value");
    }

    return { ...ctx };
}

export default DataContext;

