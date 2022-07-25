import axios from '../HttpClient';
import { User } from './types/User';
import { VehicleLocation } from './types/VehicleLocation';

interface GetUsersResponse {
    data: User[];
}

interface GetVehicleLocationsResponses {
    data: VehicleLocation[];
}

const GetUsersWithVehicles = async (): Promise<User[]> => {
    const response = await axios.get<GetUsersResponse>('http://mobi.connectedcar360.net/api/?op=list', {
        id: 'user-list',
        cache: {
            ttl: 1000 * 60 * 5
        },
    });

    if (response.status !== 200 || response.headers['content-type'] !== "application/json") {
        axios.storage.remove('user-list');
        throw new Error("Couldn't get user list");
    }

    return response.data.data.filter(obj => obj && Object.keys(obj).length !== 0) as User[];
}

const GetVehicleLocations = async (userId: number): Promise<VehicleLocation[]> => {
    const response = await axios.get<GetVehicleLocationsResponses>(`http://mobi.connectedcar360.net/api/?op=getlocations&userid=${userId}`, {
        id: `getlocations-${userId}`,
        cache: {
            ttl: 1000 * 30,
        }
    });

    if (response.status !== 200 || response.headers['content-type'] !== "application/json") {
        axios.storage.remove(`getlocations-${userId}`);
        throw new Error("Couldn't get locations");
    }

    return response.data.data.filter(obj => obj && Object.keys(obj).length !== 0);
};

const VehicleService = {
    GetUsersWithVehicles,
    GetVehicleLocations
};

export default VehicleService;