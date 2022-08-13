import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";

interface props {
    id: number;
    hostId: number;
}


const EventMenu: React.FC<props> = ({id, hostId}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const publishButton = async () => {
        const data = {conferenceId: id, hostId: hostId};
        const resData = await fetch("/api/conference/submit-conference", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          console.log(resData);
          setAnchorEl(null);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <IconButton sx={{ color: "rgba(106, 53, 242, 0.77)" }} onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Link href={`/event/${id.toString()}`} passHref >
                    <MenuItem onClick={handleClose}>View</MenuItem>
                </Link>
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={publishButton}>Publish</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </>
    )
}

export default EventMenu;
