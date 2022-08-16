import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { PopUp } from "../components/AlertPop-up";

interface hostProps {
    host_id: string,
    user_name: string,
    email: string,
    first_name: string,
    last_name: string,
    create_at: Date,
    update_at: Date,
    host_type: string
}

interface props {
    host: hostProps;
    props: any;
}


const EventMenuAdmin: React.FC<props> = ({ host, props }) => {
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

    const banButton = async () => {
        // ban API here
        const resData = await fetch("/api/host/ban-host?id=" + host.host_id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.value}`
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

    const unbanButton = async () => {
        // unban API here
        const resData = await fetch("/api/host/unban-host?id=" + host.host_id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${props.value}`
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

    const viewButton = () => {
        //popUp Host profile here

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
                {(host?.host_type === "ban") ? (
                    <>
                        <MenuItem onClick={viewButton}>View</MenuItem>
                        <MenuItem onClick={unbanButton}>Unban</MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem onClick={viewButton}>View</MenuItem>
                        <MenuItem onClick={banButton}>Ban</MenuItem>
                    </>
                )}

            </Menu>
        </>
    )
}

export default EventMenuAdmin;
