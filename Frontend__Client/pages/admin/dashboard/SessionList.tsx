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
import { splitNum } from "../../../GlobalFunction/SplitNumber"
import TextField from "@mui/material/TextField";

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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getTotalPrice = (conferenceList: ConferenceProp[]) => {
    let totalPrice = 0;
    conferenceList?.forEach((item) => {
      totalPrice += parseInt(item.price.toString());
    });
    return totalPrice;
  }

  const getTotalGross = (conferenceList: ConferenceProp[]) => {
    let totalGross = 0;
    conferenceList?.forEach((item) => {
      totalGross += parseInt(item.price.toString()) * parseInt(item.current_quantity.toString());
    });
    return totalGross;
  }

  const getTotalTicket = (conferenceList: ConferenceProp[]) => {
    let totalPrice = 0;
    conferenceList?.forEach((item) => {
      totalPrice += parseInt(item.ticket_quantity.toString());
    });
    return totalPrice;
  }

  const getTotalTicketSold = (conferenceList: ConferenceProp[]) => {
    let totalPrice = 0;
    conferenceList?.forEach((item) => {
      totalPrice += parseInt(item.current_quantity.toString());
    });
    return totalPrice;
  }
  const Total = props?.data?.reduce((result, item) => {
    let a = item.comboSessionPrice;
    let b = getTotalTicketSold(item.conferenceList);

    if (typeof item.comboSessionPrice === 'string') {
      a = parseInt(item.comboSessionPrice)
    }
    return result + a * b;
  }, 0);

  const TotalAfterDiscount = props?.data?.reduce((result, item) => {
    let a = item.comboSessionPrice;
    let b = getTotalTicketSold(item.conferenceList);

    if (typeof item.comboSessionPrice === 'string') {
      a = parseInt(item.comboSessionPrice)
    }
    let total = a * b;
    let discountPrice = total * item.discount / 100
    return result + total - discountPrice;
  }, 0);

  return (
    <>
      <Box sx={{ marginLeft: "0" }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          Sessions
        </Typography>
        <Box sx={{ marginRight: "5rem", float: "right" }}>
          <FormControl sx={{ width: "15rem", marginRight: "2rem" }}>
            <InputLabel id="select-type">Sort Type</InputLabel>
            <Select
              labelId="select-type"
              value={sortType}
              label={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Total session gross"
            disabled
            type="string"
            value={`${splitNum(Total)} VNĐ` || ''}
            sx={{ marginRight: "2rem" }}
          />
          <TextField
            label="Gross after discount"
            disabled
            type="string"
            value={`${splitNum(TotalAfterDiscount)} VNĐ` || ''}
          />
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "5rem", marginLeft: "5rem", width: "90%" }}>
          <Table >
            <TableHead sx={{ backgroundColor: "#4F3398" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff" }}>Combos</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Sold</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Gross</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Session Price</TableCell>
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
                  <TableCell align="right">{splitNum(getTotalGross(row?.conferenceList))} VNĐ</TableCell>
                  <TableCell align="right">{splitNum(getTotalPrice(row?.conferenceList))} VNĐ</TableCell>
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
