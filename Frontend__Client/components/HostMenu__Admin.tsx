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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
interface ConferenceProps {
    status: boolean;
    data: ConferenceProp[];
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
    conference_category: number;
    viewed: number;
    popularity: number;
    // conferenceOrganizer: string;
}
interface props {
    host: hostProps;
    props: any;
}
interface hostProfile {
    host: hostProps;
    conferences: ConferenceProp[];
    category: CategoryProp[]
    show: string;
    setShow: (value: string) => void;
}
interface CategoryProps {
    status: boolean;
    data: CategoryProp[];
}
interface CategoryProp {
    category_id: number;
    category_name: string;
}

const Profile: React.FC<hostProfile> = ({ host, show, setShow, conferences, category }) => {
    console.log(conferences)
    const getCateById = (id: number) => {
        category.find(c => c.category_id === id)
    };
    const mostViewed = conferences?.reduce(function (prev, current) { return prev.viewed > current.viewed ? prev : current })
    const hotest = conferences?.reduce(function (prev, current) { return prev.popularity > current.popularity ? prev : current })
    const sortByCategory = category?.map(c => (
        {
            total: conferences?.reduce(function (prev, current) { return current.conference_category === c.category_id ? prev += 1 : prev }, 0),
            cateName: c.category_name
        }
    ))

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
                            <Typography sx={{ fontWeight: '700', fontSize: '3rem' }}>{host.user_name}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: '5rem', ml: '3rem', flexShrink: 0 }}>
                            <FormControl variant='standard' sx={{ width: '25%', marginRight: '5vw' }}>
                                <InputLabel sx={{ fontSize: '1.4rem' }}>First Name</InputLabel>
                                <Input
                                    disabled
                                    id='component-simple'
                                    sx={{ fontSize: '1.4rem' }}
                                    value={host.first_name}
                                />
                            </FormControl>
                            <FormControl variant='standard' sx={{ width: '25%', marginRight: '5vw' }}>
                                <InputLabel sx={{ fontSize: '1.2rem' }}>Last Name</InputLabel>
                                <Input
                                    disabled
                                    id='component-simple'
                                    sx={{ fontSize: '1.4rem' }}
                                    value={host.last_name}
                                />
                            </FormControl>
                            <FormControl variant='standard' sx={{ width: '30%', marginRight: '5vw' }}>
                                <InputLabel sx={{ fontSize: '1.2rem' }}>Email</InputLabel>
                                <Input
                                    id='component-simple'
                                    sx={{ fontSize: '1.4rem' }}
                                    value={host.email}
                                    disabled
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{ ml: '3rem' }}>
                                Most viewed event: {mostViewed?.conference_name} ({mostViewed?.viewed} views)</Typography>
                            <Typography variant="h6" gutterBottom sx={{ ml: '3rem' }}>
                                Hotest event: {hotest?.conference_name} ({mostViewed?.popularity} people concern)</Typography>
                        </Box>
                        <TableContainer component={Paper} sx={{ marginTop: "1rem", marginLeft: "5rem", width: "70%" }} style={{ maxHeight: "15vw", overflow: 'auto' }}>
                            <Table >
                                <TableHead sx={{ backgroundColor: "#4F3398" }}>
                                    <TableRow>
                                        <TableCell align="center" sx={{ color: "#ffffff" }}>Total Conferences</TableCell>
                                        <TableCell align="center" sx={{ color: "#ffffff" }}>Category</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortByCategory?.map((row) => (
                                        <TableRow key={row.cateName} sx={{ width: "100%" }}>
                                            <TableCell align="center">{row?.total}</TableCell>
                                            <TableCell align="center">{row?.cateName}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
    const [successMessage, setSuccessMessage] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [conferences, setConferences] = useState<ConferenceProps>();
    const [categoryList, setCategoryList] = useState<CategoryProps>()

    const fetchConferences = async () => {
        const dataResult = await fetch(`/api/conference/get-conference-by-host-id/${host.host_id}`);
        const cateResult = await dataResult.json();
        if (cateResult.status === 'false') {
            setConferences({
                status: false,
                data: [],
            });
            return;
        }
        setConferences(cateResult)
    }
    const fetchDataCate = async () => {
        const dataResult = await fetch("/api/conference-category/get-all");
        const cateResult = await dataResult.json();
        setCategoryList(cateResult)
    }

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
            setSuccessMessage("Host has been banned successfully");
            setTimeout(refreshPage, 2000);
        } else {
            setStatus("0");
            setPopUp("1");
            setErrorMessage("Host has not been banned");
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
            setSuccessMessage("Host has been unbanned successfully");
            setTimeout(refreshPage, 2000);
        } else {
            setStatus("0");
            setPopUp("1");
            setErrorMessage("Host has not been unbanned");
        }
        setAnchorEl(null);
    }

    const viewButton = () => {
        setShowPopUp("1");
        fetchConferences();
        fetchDataCate();
        setAnchorEl(null);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <PopUp status={status} popUp={popUp} onClick={() => setPopUp("0")} successMessage={successMessage} errorMessage={errorMessage} />
            <Profile host={host} show={showPopUp} setShow={setShowPopUp} conferences={conferences?.data} category={categoryList?.data} />
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
