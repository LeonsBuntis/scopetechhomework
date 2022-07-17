import { useMemo } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import { Vehicle } from "../../services/CarService";

export const Map = () => {

    const { userId, vehicle } = useDataProvider();

    return userId && vehicle
        ? <>
            <h1>UserId: {userId}</h1>
            <p>vehicle: {vehicle.vehicleid}</p>
        </>
        : <>
            <p>Please select vehicle</p>
        </>;
}