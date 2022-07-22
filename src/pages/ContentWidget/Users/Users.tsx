import { List} from "@mui/material";
import { useDataProvider } from "../../../contexts/DataContext";
import { UserListItem } from "./components/UserListItem";

export const Users = () => {
    const { users } = useDataProvider();

    return (
        <List sx={{ bgcolor: 'background.paper' }}>
            {users && users.map(user => <UserListItem user={user} key={user.userid} />)}
        </List>
    );
}