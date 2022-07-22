import axios from "axios";

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
    const response = await axios.get<GetUsersResponse>('http://mobi.connectedcar360.net/api/?op=list');
    if (response.status !== 200) {
        console.log('could not get response');
    }
    
    return response.data.data.filter(obj => obj && Object.keys(obj).length !== 0) as User[];
}

const GetVehicleLocations = async (userId: number): Promise<VehicleLocation[]> => {
    const response = await axios.get<GetVehicleLocationsResponses>(`http://mobi.connectedcar360.net/api/?op=getlocations&userid=${userId}`);
    if (response.status !== 200) {
        console.log('could not get response');
    }

    return response.data.data;
};

export default {
    GetUsersWithVehicles,
    GetVehicleLocations
}