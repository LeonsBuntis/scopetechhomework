import { List } from "@mui/material";
import { useState, useEffect } from "react";
import CarService, { User } from "../../services/CarService";
import { UserComponent } from "./components/UserComponent";

export const Users = () => {

    const [users, setUsers] = useState<User[] | []>([]);

    useEffect(() => {
        const load = async () => {
            const users = await CarService.GetUsersWithVehicles();
            setUsers(users);
        };
        load();

        return () => { };
    }, [])


    return (
        <List sx={{ bgcolor: 'background.paper' }}>
            {users.map(user => <UserComponent user={user} key={user.userid} />)}
        </List>
    );
}