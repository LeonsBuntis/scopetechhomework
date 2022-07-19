import { List } from "@mui/material";
import { useState, useEffect } from "react";
import { useDataProvider } from "../../contexts/DataContext";
import CarService, { User, Vehicle } from "../../services/CarService";
import { UserComponent } from "./components/UserComponent";

export const Users = () => {
    const { users } = useDataProvider();
    
    return (
        <List sx={{ bgcolor: 'background.paper' }}>
            {users && users.map(user => <UserComponent user={user} key={user.userid} />)}
        </List>
    );
}