import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useMappedParams } from "../hooks/useMappedParams";
import CarService, { User, Vehicle, VehicleLocation } from "../services/CarService";

export interface DataContextProps {
    users: User[] | undefined,
    vehicles: Vehicle[] | undefined,
    currentUser: User | undefined,
    currentVehicle: Vehicle | undefined,
    setCurrentUserId: (userId: number | undefined) => void,
    setCurrentVehicleId: (userId: number | undefined) => void
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = (props: PropsWithChildren<{}>) => {
    const [userId, setCurrentUserId] = useState<number | undefined>(undefined);
    const [vehicleId, setCurrentVehicleId] = useState<number | undefined>(undefined);

    const [users, setUsers] = useState<User[] | undefined>(undefined);
    const [locations, setLocations] = useState<VehicleLocation[] | undefined>(undefined);

    const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined);

    const params = useMappedParams();

    const findUser = (users: User[] | undefined, userId: number | undefined) => {
        return users?.find(u => u.userid == userId);
    }

    const findVehicle = (vehicleId: number | undefined) => {
        return vehicles?.find(v => v.vehicleid === vehicleId);
    }

    const [currentUser, setCurrentUser] = useState<User | undefined>(findUser(users, userId));
    const [currentVehicle, setCurrentVehicle] = useState<Vehicle | undefined>(findVehicle(vehicleId));

    useEffect(() => {
        const newUser = findUser(users, userId);
        setCurrentUser(newUser);
    }, [users, userId]);

    useEffect(() => {
        const newVehicle = findVehicle(vehicleId);
        setCurrentVehicle(newVehicle);
    }, [currentUser, vehicleId]);

    useEffect(() => {
        (async () => {
            const response = await CarService.GetUsersWithVehicles();
            setUsers(response);
        })();

        return () => { };
    }, []);

    useEffect(() => {
        const loadLocations = async (userId: number) => {
            const locations = await CarService.GetVehicleLocations(userId);
            console.log(`loaded locations`);
            console.log(locations);
            
            if (!locations) {
                throw new Error("couldn't load locations");
            }
            if (!users) {
                throw new Error("users undefined");
            }
            const user = users.find(user => user.userid === userId);
            if (!user) {
                throw new Error("Could not find user");
            }
            const vehiclesToDisplay: Vehicle[] = [];
            locations.forEach(location => {
                if (!location.lat || !location.lon) {
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

        if (userId && users) {
            loadLocations(userId);
        }

        return () => { };
    }, [userId, users])


    return <DataContext.Provider value={{ users, vehicles, currentUser, currentVehicle, setCurrentUserId, setCurrentVehicleId }} {...props} />;
}

export const useDataProvider = (): DataContextProps => {
    const ctx = useContext(DataContext);
    if (ctx === undefined) {
        throw new Error("useCtx must be inside a Provider with a value");
    }

    return { ...ctx };
}

export default DataContext;

