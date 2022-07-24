import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Container, Stack } from '@mui/material';

const mdTheme = createTheme();

const Layout = ({ children }: {
    children: JSX.Element | JSX.Element[]
}) => {
    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        mt: 0,
                        p: 0
                    }}
                >
                    <Container disableGutters maxWidth={false}>
                        <Stack direction="row">
                            {children}
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default Layout;