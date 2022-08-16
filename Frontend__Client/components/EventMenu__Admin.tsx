import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { PopUp } from "../components/AlertPop-up";

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
    event: ConferenceProp
    props: any;
}


const EventMenuAdmin: React.FC<props> = ({ id, event, props }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [popUp, setPopUp] = useState("0");
    const [status, setStatus] = useState("0");

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    function refreshPage() {
        window.location.reload();
    }
    const publishButton = async () => {
        const resData = await fetch("/api/admin/verify-conference/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.value
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
    const deleteButton = async () => {
        const resData = await fetch("/api/admin/delete-conference/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.value
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
    const cancelButton = async () => {
        const resData = await fetch("/api/conference/cancel-conference/" + id, {
            method: "POST",
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
            <PopUp status={status} popUp={popUp} onClick={() => setPopUp("0")} />
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
                                <MenuItem onClick={cancelButton}>Cancel</MenuItem>
                            </>)
                    )
                }



            </Menu>
        </>
    )
}

export default EventMenuAdmin;
