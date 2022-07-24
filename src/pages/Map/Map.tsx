import 'leaflet/dist/leaflet.css';

import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Container } from "@mui/material";
import MarkersLayer from './MarkersLayer';
import { useUserProvider } from '../../contexts/UserContext';
import { useEffect, useState } from 'react';
import { User } from '../../services/CarService';
import { useMappedParams } from '../../hooks/useMappedParams';
import VehicleInfo from '../../components/VehicleInfo';

export const Map = () => {
    const { users } = useUserProvider();
    const { userId } = useMappedParams();

    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const user = users?.find(user => user.userid === userId);

        setCurrentUser(user);
    }, [userId]);

    return <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <VehicleInfo />
        <MapContainer style={{ height: '100%' }} center={[56.9496, 24.1052]} zoom={12} zoomControl={false}>
            <ZoomControl position='bottomright' />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {currentUser ? <MarkersLayer currentUser={currentUser} /> : <></>}
        </MapContainer>
    </Container>

}