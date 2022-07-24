import { useSnackbar } from "notistack";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import CarService, { User } from "../services/CarService";
import { useLoadingProvider } from "./LoadingContext";

export interface UserContextProps {
    users: User[] | undefined,
    loading: boolean
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = (props: PropsWithChildren<{}>) => {
    const { enqueueSnackbar } = useSnackbar();
    const { loading, setLoading } = useLoadingProvider();

    const [users, setUsers] = useState<User[] | undefined>(undefined);

    useEffect(() => {
        console.log('load users');

        const loadUsers = async () => {
            try {
                setLoading(true);
                const response = await CarService.GetUsersWithVehicles();
                setUsers(response);
                setTimeout(() => {
                    setLoading(false);
                }, 700);
            } catch (e: any) {
                enqueueSnackbar(e.message, { variant: "error" });
            }
        };

        loadUsers();

        return () => { };
    }, [enqueueSnackbar, setLoading]);

    return <UserContext.Provider value={{
        users,
        loading
    }} {...props} />;
}

export const useUserProvider = (): UserContextProps => {
    const ctx = useContext(UserContext);
    if (ctx === undefined) {
        throw new Error("useCtx must be inside a Provider with a value");
    }

    return { ...ctx };
}

export default UserContext;

