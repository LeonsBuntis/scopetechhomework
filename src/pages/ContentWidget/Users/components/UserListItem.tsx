import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from "@mui/material";
import { User } from "../../../../services/CarService";
import { Link as RouterLink } from "react-router-dom";

export const UserListItem = ({ user }: { user: User }): JSX.Element => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemButton component={RouterLink} to={`${user.userid}/vehicles`}  >
                    <ListItemAvatar>
                        <Avatar
                            alt={`${user.owner.name} ${user.owner.surname}`}
                            src={user.owner.foto}
                        />
                    </ListItemAvatar>
                    <ListItemText primary={`${user.owner.name} ${user.owner.surname} (${user.vehicles.length})`} />
                </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li" />
        </>
    );
}
