import { useEffect, useState } from "react";
import { Vehicle } from "../services/CarService";

const useVehicle = ({ initVehicles, initSelectedVehicleId }: {
    initVehicles: Vehicle[],
    initSelectedVehicleId: number | undefined
}) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>(initVehicles);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(() => {
        if (!initSelectedVehicleId) {
            return undefined;
        }

        const newVehicle = vehicles.find(v => v.vehicleid === initSelectedVehicleId);
        return newVehicle;
    });

    const selectVehicle = (vehicleId: number) => {
        const newVehicle = vehicles.find(v => v.vehicleid === vehicleId);

        setSelectedVehicle(newVehicle);
    }

    return [selectedVehicle, selectVehicle];
}

export default useVehicle;