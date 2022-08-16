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
    date_start_conference: Date;
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
}


const EventMenu: React.FC<props> = ({ id, hostId, event }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [popUp, setPopUp] = useState("0");
    const [status, setStatus] = useState("0");
    function refreshPage() {
        window.location.reload();
    }

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const publishButton = async () => {
        const data = { conferenceId: id, hostId: hostId };
        const resData = await fetch("/api/conference/submit-conference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (resData.status === 200) {
            setStatus("1");
            setPopUp("1");
            setTimeout(refreshPage, 2000);
        } else {
            setStatus("0");
            setPopUp("1");
        }
        setAnchorEl(null);
    }

    const deleteButton = async () => {
        //TODO: delete api của host 
        const resData = await fetch("/api/conference/delete-conference/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (resData.status === 200) {
            setStatus("1");
            setPopUp("1");
            setTimeout(refreshPage, 2000);
        } else {
            setStatus("0");
            setPopUp("1");
        }
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
                {(event?.status_ticket === "published" || event?.status_ticket === "pending") ?
                    (
                        <Link href={`/event/${id.toString()}`} passHref >
                            <MenuItem onClick={handleClose}>View</MenuItem>
                        </Link>
                    ) : (
                        <>
                            <Link href={`/event/${id.toString()}`} passHref >
                                <MenuItem onClick={handleClose}>View</MenuItem>
                            </Link>
                            <Link href={`/host/dashboard/edit-event/${id.toString()}`} passHref >
                                <MenuItem onClick={handleClose}>Edit</MenuItem>
                            </Link>

                            <MenuItem onClick={publishButton}>Publish</MenuItem>
                            <MenuItem onClick={deleteButton}>Delete</MenuItem>
                        </>
                    )
                }
            </Menu>
        </>
    )
}

export default EventMenu;
