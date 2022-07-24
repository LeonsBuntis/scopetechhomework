import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useUserProvider } from "../../contexts/UserContext";
import LoadingBackdrop from "../../components/LoadingBackdrop";

const ContentWidget = () => {
    const { loading } = useUserProvider();

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