import { List } from "@mui/material";
import { useUserProvider } from "../../../contexts/UserContext";
import { UserListItem } from "./components/UserListItem";

export const Users = () => {
    const { users } = useUserProvider();

    return !!users ?
        <List sx={{ bgcolor: 'background.paper' }}>
            {users.map(user => <UserListItem user={user} key={user.userid} />)}
        </List> :
        <>Couldn't load users</>;
}