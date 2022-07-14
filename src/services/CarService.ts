import axios from "axios";

export interface Vehicle {
    color: string;
    foto: string;
    make: string;
    model: string;
    vehicleid: number;
    vin: string;
    year: number;
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

interface GetUsersResponse {
    data: User[];
}

export interface VehicleLocations {

}

interface GetVehicleLocationsResponses {
    data: VehicleLocations;
}

const GetUsersWithVehicles = async (): Promise<User[]> => {
    const response = await axios.get<GetUsersResponse>('http://mobi.connectedcar360.net/api/?op=list');

    return response.data.data.filter(obj => obj && Object.keys(obj).length !== 0);
}

const GetVehicleLocations = async (userId: string): Promise<VehicleLocations> => {
    const response = await axios.get<GetVehicleLocationsResponses>(`http://mobi.connectedcar360.net/api/?op=getlocations&userid=${userId}`);

    return response.data;
};

export default {
    GetUsersWithVehicles,
    GetVehicleLocations
}