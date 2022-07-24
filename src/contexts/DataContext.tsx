import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMappedParams } from "../hooks/useMappedParams";
import { User, Vehicle } from "../services/CarService";

export interface DataContextProps {
    users: User[] | undefined,
    setUsers: (users: User[]) => void,
    currentUserId: number | undefined,
    currentVehicleId: number | undefined
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = (props: PropsWithChildren<{}>) => {

    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [vehicleId, setVehicleId] = useState<number | undefined>(undefined);

    const [users, setUsers] = useState<User[] | undefined>(undefined);

    const params = useMappedParams();
    useEffect(() => {
        setUserId(params.userId);
        setVehicleId(params.vehicleId);
    }, [params]);

    return <DataContext.Provider value={{
        users,
        setUsers,
        currentUserId: userId,
        currentVehicleId: vehicleId
    }} {...props} />;
}

export const useDataProvider = (): DataContextProps => {
    const ctx = useContext(DataContext);
    if (ctx === undefined) {
        throw new Error("useCtx must be inside a Provider with a value");
    }

    return { ...ctx };
}

export default DataContext;

