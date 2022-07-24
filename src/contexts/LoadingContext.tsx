import { createContext, PropsWithChildren, useContext, useState } from "react";
import LoadingBackdrop from "../components/LoadingBackdrop";

export interface LoadingContextProps {
    loading: boolean,
    setLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = (props: PropsWithChildren<{}>) => {
    const [loading, setLoading] = useState<boolean>(false);

    return <LoadingContext.Provider value={{
        loading,
        setLoading
    }} {...props}>
        <LoadingBackdrop show={loading} />
        {props.children}
    </LoadingContext.Provider >;
}

export const useLoadingProvider = (): LoadingContextProps => {
    const ctx = useContext(LoadingContext);
    if (ctx === undefined) {
        throw new Error("useCtx must be inside a Provider with a value");
    }

    return { ...ctx };
}

export default LoadingContext;
