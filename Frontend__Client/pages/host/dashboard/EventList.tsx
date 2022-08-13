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
import styles from "../styles/CreateEventForm.module.scss";
import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import EventMenu from "../../../components/EventMenu";

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

interface EventListProps {
  data: ConferenceProp[];
  propss: any;
}
export const EventList = (props: EventListProps) => {
  const [sortType, setSortType] = useState('lastest');

  return (
    <>
      <Box sx={{ marginLeft: "0" }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          Events
        </Typography>
        <Box sx={{ marginRight: "5rem", float: "right" }}>
          <FormControl sx={{ width: "15rem" }}>
            <InputLabel id="select-type">Sort Type</InputLabel>
            <Select
              labelId="select-type"
              value={sortType}
              label={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <MenuItem value="lastest">Latest</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            sx={{ width: "15rem", height: "3.5rem", marginLeft: "5rem", color: "black", borderColor: "black" }}
          >
            <Link href="/host/create-event">
              <a>
                Create an event
              </a>
            </Link>
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "5rem", marginLeft: "5rem", width: "90%" }}>
          <Table >
            <TableHead sx={{ backgroundColor: "#4F3398" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff" }}>Events</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Sold</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Gross</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.data?.map((row) => (
                <TableRow key={row.conference_id} sx={{ width: "100%" }}>
                  <TableCell component="th" scope="row">
                    <>
                      <Typography sx={{ fontWeight: "bold" }}>{row.conference_name}</Typography>
                      {row?.conference_type.toString() === "1" ? "Offline" : "Online"} event <br />
                      {row.date_start_conference}
                    </>
                  </TableCell>
                  <TableCell align="right">{row.current_quantity}/{row.ticket_quantity}</TableCell>
                  <TableCell align="right">${row?.price || "0"}</TableCell>
                  <TableCell align="right">{row.status_ticket?.toUpperCase()}</TableCell>
                  <TableCell sx={{ width: "2rem" }}>
                    <EventMenu id={row.conference_id} hostId={props.propss.tempDecode.sub} event={row}/>
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
