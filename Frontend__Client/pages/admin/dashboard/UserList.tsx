import { useState } from "react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "../../../styles/CreateEventForm.module.scss";
import MenuItem from "@mui/material/MenuItem";
import EventMenuAdmin from "../../../components/EventMenu__Admin";
import HostMenu from "../../../components/HostMenu__Admin";

interface host {
    host_id: string,
    user_name: string,
    email: string,
    first_name: string,
    last_name: string,
    create_at: Date,
    update_at: Date,
    host_type: string
}

interface EventListProps {
    data: host[];
    propss: any;
    filter: (props: string) => void;
}

export const UserList = (props: EventListProps) => {
    const [sortType, setSortType] = useState('all');

    function parseDate(dateString: Date) {
        const date = new Date(dateString);
        const day = date.getDate()
        const hour = date.getHours()
        const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        let weekDayString = weekday[date.getDay()]
        let monthString = date.toLocaleString('en-us', { month: 'short' })
        const dateFinal = `${weekDayString}, ${monthString} ${day}`
        return dateFinal
    }

    return (
        <>
            <Box sx={{ marginLeft: "0" }}>
                <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
                    Host
                </Typography>
                <Box sx={{ marginRight: "5rem", float: "right" }}>
                    <FormControl sx={{ width: "15rem", marginRight: "2rem" }}>
                        <InputLabel id="select-type">Sort Type</InputLabel>
                        <Select
                            labelId="select-type"
                            value={sortType}
                            label={sortType}
                            onChange={(e) => { props.filter(e.target.value); setSortType(e.target.value) }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="free">Free</MenuItem>
                            <MenuItem value="premium">Premium</MenuItem>
                            <MenuItem value="ban">Ban</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <TableContainer component={Paper} sx={{ marginTop: "5rem", marginLeft: "5rem", width: "90%" }}>
                    <Table >
                        <TableHead sx={{ backgroundColor: "#4F3398" }}>
                            <TableRow>
                                <TableCell sx={{ color: "#ffffff" }}>Hosts Name</TableCell>
                                <TableCell align="right" sx={{ color: "#ffffff" }}>Status</TableCell>
                                <TableCell align="right" sx={{ color: "#ffffff" }}>Expiration Date</TableCell>
                                <TableCell align="right" sx={{ color: "#ffffff" }}>Number of Event</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props?.data?.map((row) => (
                                <TableRow key={row.host_id} sx={{ width: "100%" }}>
                                    <TableCell align="left">{row?.user_name}</TableCell>
                                    <TableCell align="right">{row?.host_type.toUpperCase()}</TableCell>
                                    <TableCell align="right">{parseDate(row?.update_at)}</TableCell>
                                    <TableCell align="right">{row?.host_id}</TableCell>
                                    <TableCell sx={{ width: "2rem" }}>
                                        <HostMenu event={row} props={props.propss} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
