import { VehicleLocation } from "./VehicleLocation";

export type Vehicle = {
    vehicleid: number;
    color: string;
    foto: string;
    make: string;
    model: string;
    vin: string;
    year: number;

    location: VehicleLocation;
}