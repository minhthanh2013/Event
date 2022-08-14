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
import Link from 'next/link'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/MoreVertOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";

interface SessionProps {
  data: SessionListProp[];
  propss: any;
  filter: (props: string) => void;
}

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

export const Sessions = (props: SessionProps) => {
  const [sortType, setSortType] = useState('all');

  interface Data {
    name: string;
    sold: number;
    gross: number;
    numOfEvent: number;
  }

  function createData(
    name: string,
    sold: number,
    gross: number,
    numOfEvent: number,
  ): Data {
    return {
      name,
      sold,
      gross,
      numOfEvent,
    };
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTotalPrice = (conferenceList: ConferenceProp[]) => {
    // 9:00 PM – Saturday, Dec 10,{" "}
    let totalPrice = 0;
    conferenceList?.forEach((item) => {
      totalPrice += parseInt(item.price.toString());
    });
    return totalPrice;
  }

  const getTotalTicket = (conferenceList: ConferenceProp[]) => {
    // 9:00 PM – Saturday, Dec 10,{" "}
    let totalPrice = 0;
    conferenceList?.forEach((item) => {
      totalPrice += parseInt(item.ticket_quantity.toString());
    });
    return totalPrice;
  }

  const getTotalTicketSold = (conferenceList: ConferenceProp[]) => {
    // 9:00 PM – Saturday, Dec 10,{" "}
    let totalPrice = 0;
    conferenceList?.forEach((item) => {
      totalPrice += parseInt(item.current_quantity.toString());
    });
    return totalPrice;
  }

  return (
    <>
      <Box sx={{ marginLeft: "0" }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          Sessions
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
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="host">Host</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "5rem", marginLeft: "5rem", width: "90%" }}>
          <Table >
            <TableHead sx={{ backgroundColor: "#4F3398" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff" }}>Combos</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Sold</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Gross</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff", paddingRight: "3rem" }}>Number of Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.data?.map((row) => (
                <TableRow key={row?.comboSessionId} sx={{ width: "100%" }}>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontWeight: "bold" }}>{row?.comboSessionName}</Typography>
                  </TableCell>
                  <TableCell align="right">{getTotalTicketSold(row?.conferenceList)}/{getTotalTicket(row?.conferenceList)}</TableCell>
                  <TableCell align="right">${getTotalPrice(row?.conferenceList)}</TableCell>
                  <TableCell align="right" sx={{ width: "15rem" }}>
                    {row?.conferenceList?.length}
                    <IconButton sx={{ color: "rgba(106, 53, 242, 0.77)", marginLeft: "2rem" }} onClick={handleClick}>
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <Link href={`/session/${row?.comboSessionId}`} passHref>
                        <MenuItem onClick={handleClose}>View</MenuItem>
                      </Link>
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
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
