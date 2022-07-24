import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Container } from "@mui/material";
import MarkersLayer from './MarkersLayer';

export const Map = () => {
    return <Container disableGutters maxWidth={false} sx={{height: "100vh"}}>
        <MapContainer style={{ height: '100%' }} center={[56.9496, 24.1052]} zoom={12} zoomControl={false}>
            <ZoomControl position='bottomright' />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkersLayer />
        </MapContainer>
    </Container>
}