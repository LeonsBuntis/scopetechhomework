import { Popup } from "react-leaflet";
import VehicleCard from "../../../components/VehicleCard";
import { Vehicle } from "../../../services/CarService";

const CarTooltip = ({ vehicle }: {
    vehicle: Vehicle
}) => {

    return <Popup>
        <VehicleCard vehicle={vehicle} />
    </Popup>
}

export default CarTooltip;