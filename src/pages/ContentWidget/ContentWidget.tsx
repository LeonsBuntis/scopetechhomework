import { Container, List, Stack, Link, Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const ContentWidget = () => {
    const navigate = useNavigate();

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
            <Box>
                <Button variant="text" onClick={() => navigate(-1)}><ChevronLeftIcon />Back</Button>
            </Box>

            <Outlet />
        </Stack >
    </Container>
}

export default ContentWidget;