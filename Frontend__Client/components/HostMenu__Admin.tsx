import Link from 'next/link'
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from "react";
import { PopUp } from "../components/AlertPop-up";
import { Avatar, Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, Typography } from '@mui/material'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close';
import styles from "../styles/HostProfile.module.scss"

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
interface hostProfile {
    host: hostProps;
    show: string;
    setShow: (value: string) => void;
}

const Profile: React.FC<hostProfile> = ({ host, show, setShow }) => {
    function stringToColor(string: any) {
        let hash = 0
        let i
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }
        let color = '#'
        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }
        return color
    }
    function stringAvatar(name: any) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}`.toUpperCase(),
        }
    }
    return (
        <>
            {show === "1" ? (
                <>
                    <Divider sx={{ borderColor: '#4F3398' }} />
                    <Box className={styles.container}>
                        <IconButton aria-label="delete" onClick={() => { setShow("0") }} size="large"
                            sx={{ position: "absolute", top: "0", right: "0", margin: "2rem 2rem 0 0" }}>
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 7 }}>
                            <Typography sx={{ color: '#ffffff', fontWeight: '700', fontSize: '3rem' }}>Host Profile</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', height: 'auto' }}>
                            <Box sx={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <IconButton>
                                    <Avatar {...stringAvatar(`${host.first_name}`)} sx={{ width: 250, height: 250 }} />
                                </IconButton>
                            </Box>
                            <Box sx={{ width: '70%' }}>
                                <Box sx={{ display: 'flex', gap: '6rem', mb: '5rem', justifyContent: 'space-evenly' }}>
                                    <FormControl variant='standard' sx={{ width: '400px' }}>
                                        <InputLabel sx={{ fontSize: '1.4rem', color: '#ffffff' }}>First Name</InputLabel>
                                        <Input
                                            disabled
                                            id='component-simple'
                                            sx={{ fontSize: '1.4rem', color: '#ffffff' }}
                                            value={host.first_name}
                                        />
                                    </FormControl>
                                    <FormControl variant='standard' sx={{ width: '400px' }}>
                                        <InputLabel sx={{ fontSize: '1.4rem', color: '#ffffff' }}>Last Name</InputLabel>
                                        <Input
                                            disabled
                                            id='component-simple'
                                            sx={{ fontSize: '1.4rem' }}
                                            value={host.last_name}
                                        />
                                    </FormControl>
                                </Box>

                                <Box >
                                    <FormControl variant='standard' sx={{ width: '400px' }}>
                                        <InputLabel sx={{ fontSize: '1.4rem', color: '#ffffff' }}>Email</InputLabel>
                                        <Input
                                            id='component-simple'
                                            sx={{ fontSize: '1.4rem' }}
                                            value={host.email}
                                            disabled
                                        />
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </>
            ) : ""}
        </>
    );
}

const EventMenuAdmin: React.FC<props> = ({ host, props }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [popUp, setPopUp] = useState("0");
    const [status, setStatus] = useState("0");
    const [showPopUp, setShowPopUp] = useState("0");

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
        setShowPopUp("1");
        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <PopUp status={status} popUp={popUp} onClick={() => setPopUp("0")} />
            <Profile host={host} show={showPopUp} setShow={setShowPopUp} />
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
