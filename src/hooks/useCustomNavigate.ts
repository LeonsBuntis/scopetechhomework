import { useNavigate } from "react-router-dom";
import { useMappedParams } from "./useMappedParams";

export const useCustomNavigate = () => {
    const navigate = useNavigate();
    const params = useMappedParams();

    const navigateToUsers = () => {
        navigate(`/users`);
    }

    const navigateToUser = (userId: number)=> {
        navigate(`/users/${userId}/vehicles`);
    }

    const navigateToVehicle = (vehicleId: number) => {
        navigate(`/users/${params.userId}/vehicles/${vehicleId}`);
    }

    return {
        navigateToUsers,
        navigateToUser,
        navigateToVehicle
    }
}