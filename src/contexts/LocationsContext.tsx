import { useSnackbar } from "notistack";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useMappedParams } from "../hooks/useMappedParams";
import CarService, { VehicleLocation } from "../services/CarService";

export interface LocationContextProps {
    locations: VehicleLocation[] | undefined,
    loading: boolean
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider = (props: PropsWithChildren<{}>) => {
    const { enqueueSnackbar } = useSnackbar();
    const { userId } = useMappedParams();

    const [locations, setLocations] = useState<VehicleLocation[] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadLocations = async (userId: number) => {
            const locations = await CarService.GetVehicleLocations(userId);
            setLocations(locations);
        };

        loadLocations(userId)
            .catch(e => {
                enqueueSnackbar(e.message, { variant: "error" });
            });

        const intervalId = setInterval(() => {
            loadLocations(userId)
                .catch(e => {
                    enqueueSnackbar("Couldn't get new location", { variant: "warning" });
                });
        }, 1000 * 60);

        return () => {
            clearInterval(intervalId);
        };
    }, [userId]);

    return <LocationContext.Provider value={{
        locations,
        loading
    }} {...props} />;
}

export const useLocationProvider = (): LocationContextProps => {
    const ctx = useContext(LocationContext);
    if (ctx === undefined) {
        throw new Error("useCtx must be inside a Provider with a value");
    }

    return { ...ctx };
}

export default LocationContext;

