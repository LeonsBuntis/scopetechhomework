import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Vehicle } from "../services/CarService";

export interface DataContextProps {
    userId: string | undefined,
    vehicle: Vehicle | undefined,
    setUserId: (userId: string | undefined) => void,
    setVehicle: (vehicle: Vehicle | undefined) => void,
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider = (props: PropsWithChildren<{}>) => {
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);

    return <DataContext.Provider value={{ userId, vehicle, setUserId, setVehicle }} {...props} />;
}

export const useDataProvider = (): DataContextProps => {
    const ctx = useContext(DataContext);
    if (ctx === undefined) {
        throw new Error("useCtx must be inside a Provider with a value");
    }

    return { ...ctx };
}

export default DataContext;

