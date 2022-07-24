import { useParams } from "react-router-dom";

export const useMappedParams = (): { userId: number, vehicleId: number } => {
    const params = useParams();

    return {
        userId: Number(params.userId),
        vehicleId: Number(params.vehicleId)
    };
}
