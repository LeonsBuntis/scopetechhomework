import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMappedParams } from "../hooks/useMappedParams";
import CarService, { User, Vehicle, VehicleLocation } from "../services/CarService";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

export interface DataContextProps {
    users: User[] | undefined,
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

    const params = useMappedParams();
    useEffect(() => {
        setCurrentUserId(params.userId);
        setCurrentVehicleId(params.vehicleId);
    }, [params]);

    const findUser = (users: User[] | undefined, userId: number | undefined) => {
        return users?.find(u => u.userid == userId);
    }

    const findVehicle = (vehicleId: number | undefined) => {
        return currentUser?.vehicles?.find(v => v.vehicleid === vehicleId);
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
                enqueueSnackbar(e.message, { variant: "error" });
            }
        })();

        return () => { };
    }, []);

    return <DataContext.Provider value={{ users, currentUser, currentVehicle, setCurrentUserId, setCurrentVehicleId }} {...props} />;
}

export const useDataProvider = (): DataContextProps => {
    const ctx = useContext(DataContext);
    if (ctx === undefined) {
        throw new Error("useCtx must be inside a Provider with a value");
    }

    return { ...ctx };
}

export default DataContext;

