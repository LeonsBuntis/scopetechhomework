import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMappedParams } from "../hooks/useMappedParams";
import CarService, { User, Vehicle, VehicleLocation } from "../services/CarService";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

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

    const { enqueueSnackbar } = useSnackbar();

    const [userId, setCurrentUserId] = useState<number | undefined>(undefined);
    const [vehicleId, setCurrentVehicleId] = useState<number | undefined>(undefined);

    const [users, setUsers] = useState<User[] | undefined>(undefined);
    const [locations, setLocations] = useState<VehicleLocation[] | undefined>(undefined);
    const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined);

    const params = useMappedParams();
    useEffect(() => {
        setCurrentUserId(params.userId);
        setCurrentVehicleId(params.vehicleId);
    }, [params]);

    const location = useLocation();
    useEffect(() => {
        console.log(location);
    }, [location]);

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
            try {
                const response = await CarService.GetUsersWithVehicles();
                setUsers(response);
            } catch (e: any) {
                enqueueSnackbar(e.message, {variant: "error"});
            }
        })();

        return () => { };
    }, []);

    useEffect(() => {
        const loadLocations = async (userId: number) => {
            try {
                const locations = await CarService.GetVehicleLocations(userId);
                if (!locations) {
                    throw new Error("Couldn't load locations");
                }
                if (!users) {
                    throw new Error("Users undefined");
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
            } catch (e: any) {
                enqueueSnackbar(e.message, {variant: "error"});
            }
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

