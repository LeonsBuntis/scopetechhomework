import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const ContentWidget = () => {
    return <Container disableGutters maxWidth="xs" sx={{
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
            <Outlet />
        </Stack >
    </Container>
}

export default ContentWidget;