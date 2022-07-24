import './VehicleMarker.css';

import { useEffect, useMemo, useRef, useState } from "react";
import { Marker } from 'react-leaflet';
import L from "leaflet";
import { renderToString } from 'react-dom/server';
import { useCustomNavigate } from '../../../../hooks/useCustomNavigate';

export type VehicleMarkerProps = {
    markerColor: string,
    locationLat: number,
    locationLon: number,
    vehicleId: number,

    children: JSX.Element | JSX.Element[] | undefined | false,
}

const VehicleMarker = (props: VehicleMarkerProps) => {
    const { navigateToVehicle } = useCustomNavigate();

    const createDivIcon = (color: string, selected: boolean = false) => L.divIcon({
        html: renderToString(<span className="material-icons" style={{ color: color, fontSize: 60 }} aria-hidden="true">room</span>),
        iconAnchor: [0, 0],
        popupAnchor: [6, -43],
        tooltipAnchor: [6, -43],
        className: "custom-icon-wrapper"
    });

    const [divIcon, setDivIcon] = useState<L.DivIcon>(createDivIcon(props.markerColor));

    const markerColor = useMemo(() => props.markerColor, [props]);

    useEffect(() => {
        const newIcon = createDivIcon(markerColor);
        setDivIcon(newIcon);
    }, [markerColor]);

    return <Marker
        position={[props.locationLat, props.locationLon]}
        icon={divIcon}
        eventHandlers={{
            click: e => {
                navigateToVehicle(props.vehicleId);
            }
        }}>
        {props.children}
    </Marker>
};

export default VehicleMarker;