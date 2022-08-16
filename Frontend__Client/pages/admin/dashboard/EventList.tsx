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
import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import EventMenu from "../../../components/EventMenu";
import EventMenuAdmin from "../../../components/EventMenu__Admin";
import TextField from "@mui/material/TextField";
import { splitNum } from "../../../GlobalFunction/SplitNumber"

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
  host_id: string;
  // conferenceOrganizer: string;
}
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

interface EventListProps {
  data: ConferenceProp[];
  propss: any;
  filter: (props: string) => void;
  host: hostProps[];
}

export const EventList = (props: EventListProps) => {
  const [sortType, setSortType] = useState('all');

  function parseDate(dateString: String) {
    const date = new Date(dateString);
    const day = date.getDate()
    const hour = date.getHours()
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let weekDayString = weekday[date.getDay()]
    let monthString = date.toLocaleString('en-us', { month: 'short' })
    const dateFinal = `${weekDayString}, ${monthString} ${day}`
    return dateFinal
  }

  const Gross = (data: ConferenceProp) => {
    return data.price * data.current_quantity
  };
  const Total = props?.data?.reduce((result, item) => {
    let a = item.price;
    let b = item.current_quantity;
    if (typeof item.price === 'string') {
      a = parseInt(item.price)
    }
    if (typeof item.current_quantity === 'string') {
      b = parseInt(item.current_quantity)
    }
    return result + a * b;
  }, 0);
  const Income = Total * 10 / 100;
  const Total_debt = Total * 90 / 100;

  const hostById = (hostList: hostProps[], hostId: string) => {
    const result = hostList?.find(h => h.host_id.toString() === hostId)
    return result?.user_name;
  }

  return (
    <>
      <Box sx={{ marginLeft: "0" }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          Conference
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
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Total conference gross"
            disabled
            type="string"
            value={`${splitNum(Total)} VNĐ` || ''}
            sx={{ marginRight: "2rem" }}
          />
          <TextField
            label="Total income"
            disabled
            type="string"
            value={`${splitNum(Income)} VNĐ` || ''}
            sx={{ marginRight: "2rem" }}
          />
          <TextField
            label="Total pay for host"
            disabled
            type="string"
            value={`${splitNum(Total_debt)} VNĐ` || ''}
          />
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "5rem", marginLeft: "5rem", width: "90%" }}>
          <Table >
            <TableHead sx={{ backgroundColor: "#4F3398" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff" }}>Events</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Sold</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Gross</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Ticket price</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Created by</TableCell>
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
                      {row?.conference_type?.toString() === "1" ? "Offline" : "Online"} event <br />
                      {parseDate(row.date_start_conference)}
                    </>
                  </TableCell>
                  <TableCell align="right">{row?.current_quantity}/{row?.ticket_quantity}</TableCell>
                  <TableCell align="right">{splitNum(Gross(row))} VNĐ</TableCell>
                  <TableCell align="right">{splitNum(row?.price) || "0"} VNĐ</TableCell>
                  <TableCell align="right">{hostById(props?.host, row?.host_id)}</TableCell>
                  <TableCell align="right">{row?.status_ticket?.toString().toUpperCase()}</TableCell>
                  <TableCell sx={{ width: "2rem" }}>
                    <EventMenuAdmin id={row?.conference_id} event={row} props={props.propss} />
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
