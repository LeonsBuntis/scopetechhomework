import axios from '../HttpClient';

interface GetLocationNameResponse {
    display_name: string
}

const GetLocationName = async (lat: number, lon: number, zoom: number = 18): Promise<string> => {
    const response = await axios.get<GetLocationNameResponse>(`https://nominatim.geocoding.ai/reverse.php?lat=${lat}&lon=${lon}&zoom=${zoom}&format=jsonv2`);
    console.log(response);
    
    return response.data.display_name;
}

const NominatimService = {
    GetLocationName
}

export default NominatimService;