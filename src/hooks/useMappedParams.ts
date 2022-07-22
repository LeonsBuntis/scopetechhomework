import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export const useMappedParams = (): { userId: number, vehicleId: number } => {
    const params = useParams();

    useEffect(() => {
        // console.log(params);
        // console.log('vehicleId: ' + params.vehicleId);

    }, [params]);

    // let location = useLocation();

    // useEffect(() => {
    //     // console.log(location);
    //     console.log('userId: ' + params.userId);
    //     console.log('vehicleId: ' + params.vehicleId);
        
    // }, [location])

    return {
        userId: Number(params.userId),
        vehicleId: Number(params.vehicleId)
    };
}
