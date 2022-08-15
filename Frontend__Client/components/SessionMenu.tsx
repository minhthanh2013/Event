import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import Link from 'next/link'
import { PopUp } from "../components/AlertPop-up";

interface SessionListProp {
    comboSessionId: number;
    comboSessionPrice: number;
    comboSessionName: string;
    comboSessionDescription: string;
    conferenceList: ConferenceProp[];
    discount: number;
}

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
    event: SessionListProp
}
export const SessionMenu: React.FC<props> = ({ event }) => {
    const [popUp, setPopUp] = useState("0");
    const [status, setStatus] = useState("0");

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function refreshPage() {
        window.location.reload();
    }

    const handleDeleteSession = async (comboId: number) => {
        const resData = await fetch(`/api/combo/delete-combo/${comboId}`, {
            method: "DELETE",
        });
        if (resData.status === 200) {
            if (resData.status === 200) {
                setStatus("1");
                setPopUp("1");
                setTimeout(refreshPage, 2000);
            } else {
                setStatus("0");
                setPopUp("1");
            }
        }
        setAnchorEl(null);
    };
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <PopUp status={status} popUp={popUp} onClick={() => setPopUp("0")} />
            <IconButton sx={{ color: "rgba(106, 53, 242, 0.77)", marginLeft: "2rem" }} onClick={handleClick}>
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Link href={`/session/${event.comboSessionId}`} passHref>
                    <MenuItem onClick={handleClose}>View</MenuItem>
                </Link>
                <Link href={`/host/dashboard/edit-session/${event.comboSessionId}`} passHref >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                </Link>
                <MenuItem onClick={() => { handleDeleteSession(event.comboSessionId) }}>Delete</MenuItem>
            </Menu>
        </>
    )
}