import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const axios = setupCache(Axios);

export interface Vehicle {
    vehicleid: number;
    color: string;
    foto: string;
    make: string;
    model: string;
    vin: string;
    year: number;

    location: VehicleLocation;
}

export interface Owner {
    foto: string;
    name: string;
    surname: string;
}

export interface User {
    userid: number;
    owner: Owner;
    vehicles: Vehicle[];
}

export interface GetUsersResponse {
    data: User[];
}

export interface VehicleLocation {
    vehicleid: number;
    lat: number;
    lon: number;
}

export interface GetVehicleLocationsResponses {
    data: VehicleLocation[];
}

const GetUsersWithVehicles = async (): Promise<User[]> => {
    const response = await axios.get<GetUsersResponse>('http://mobi.connectedcar360.net/api/?op=list', {
        cache: {
            ttl: 1000 * 60 * 5,
            cachePredicate: {
                containsHeaders: {
                    'content-type': (header) => { return header === "application/json"; }
                }
            }
        }
    });
    if (response.status !== 200) {
        throw new Error("Couldn't get user list");
    }

    return response.data.data.filter(obj => obj && Object.keys(obj).length !== 0) as User[];
}

const GetVehicleLocations = async (userId: number): Promise<VehicleLocation[]> => {
    const response = await axios.get<GetVehicleLocationsResponses>(`http://mobi.connectedcar360.net/api/?op=getlocations&userid=${userId}`, {
        cache: {
            ttl: 1000 * 30,
            cachePredicate: {
                containsHeaders: {
                    'content-type': (header) => { return header === "application/json"; }
                }
            }
        }
    });
    if (response.status !== 200) {
        throw new Error("Couldn't get locations");
    }

    return response.data.data;
};

export default {
    GetUsersWithVehicles,
    GetVehicleLocations
}