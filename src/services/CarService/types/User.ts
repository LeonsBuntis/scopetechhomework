import { Owner } from "./Owner";
import { Vehicle } from "./Vehicle";

export type User = {
    userid: number;
    owner: Owner;
    vehicles: Vehicle[];
}
