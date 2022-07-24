import { Container, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDataProvider } from "../../contexts/DataContext";
import CarService from "../../services/CarService";
import LoadingBackdrop from "../../components/LoadingBackdrop";

const ContentWidget = () => {
    const { setUsers } = useDataProvider();
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
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
        })();

        return () => { };
    }, []);

    return <Container disableGutters maxWidth="xs" sx={{
        position: "absolute",
        p: 1,
        height: "100vh",
        overflow: "auto",
        zIndex: "1000"
    }}>
        <Stack sx={{
            minHeight: "98vh",
            bgcolor: 'background.paper',
            borderRadius: 1,
            p: 2
        }}>
            {
                loading
                    ? <LoadingBackdrop show={loading} />
                    : <Outlet />
            }
        </Stack >
    </Container>
}

export default ContentWidget;