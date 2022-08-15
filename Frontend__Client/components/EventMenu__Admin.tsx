import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";

interface ConferenceProp {
    conference_id: number;
    description: string;
    price: number;
    conference_name: number;
    date_start_conference: string;
    address: string;
    ticket_quantity: number;
    current_quantity: number;
    status_ticket: string;
    conference_type: string;
    // conferenceOrganizer: string;
}
interface props {
    id: number;
    hostId: number;
    event: ConferenceProp
    props: any;
}


const EventMenuAdmin: React.FC<props> = ({ id, hostId, event, props }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const publishButton = async () => {
        const resData = await fetch("/api/admin/verify-conference/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.value
            },
        });
        setAnchorEl(null);
    }
    const deleteButton = async () => {
        const resData = await fetch("/api/admin/delete-conference/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.value
            },
        });
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
                {(event?.status_ticket === "published") ?
                    (
                        <Link href={`/event/${id.toString()}`} passHref >
                            <MenuItem onClick={handleClose}>View</MenuItem>
                        </Link>
                    ) : (
                        (event?.status_ticket === "draft") ? (
                            <>
                                <Link href={`/event/${id.toString()}`} passHref >
                                    <MenuItem onClick={handleClose}>View</MenuItem>
                                </Link>
                                <MenuItem onClick={deleteButton}>Delete</MenuItem>
                            </>
                        ) : (
                            <>
                                <Link href={`/event/${id.toString()}`} passHref >
                                    <MenuItem onClick={handleClose}>View</MenuItem>
                                </Link>
                                <MenuItem onClick={publishButton}>Publish</MenuItem>
                                <MenuItem onClick={deleteButton}>Delete</MenuItem>
                            </>)

                    )
                }



            </Menu>
        </>
    )
}

export default EventMenuAdmin;
