import { useState, useEffect } from "react"
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
import MenuItem from "@mui/material/MenuItem";
import { splitNum } from "../../../GlobalFunction/SplitNumber"
import TextField from "@mui/material/TextField";
import { SessionMenu } from "../../../components/SessionMenu";

interface SessionProps {
  data: SessionListProp[];
  propss: any;
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
interface TotalPriceProps {
  totalPrice: number;
  totalComboSell: number;
}
interface TotalPrice {
  status: boolean;
  data: TotalPriceProps;
}

export const Sessions = (props: SessionProps) => {
  const [sortType, setSortType] = useState('all');
  const [totalPrice, setTotalPrice] = useState<TotalPrice>();

  useEffect(() => {
    const fetchTotalPrice = async () => {
      const dataResult = await fetch(`/api/combo/`);
      const cateResult = await dataResult.json();
      setTotalPrice(cateResult);
    }

    fetchTotalPrice();
  }, []);

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

  const Total = props?.data?.reduce((result, item) => {
    return result + getTotalGross(item.conferenceList);
  }, 0);

  const TotalAfterDiscount = props?.data?.reduce((result, item) => {
    let total = getTotalGross(item.conferenceList);
    let discountPrice = total * item.discount / 100
    return result + total - discountPrice;
  }, 0);
  const Income = TotalAfterDiscount * 90 / 100;

  return (
    <>
      <Box sx={{ marginLeft: "0" }}>
        <Typography variant="h3" component="div" sx={{ fontWeight: "bold" }}>
          Sessions
        </Typography>
        <Box sx={{ marginRight: "5rem", float: "right", display: "flex", flexShrink: 0 }}>
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
            sx={{ marginRight: "2rem" }}
          />
          <TextField
            label="Total income"
            disabled
            type="string"
            value={`${splitNum(Income)} VNĐ` || ''}
          />
          <Button
            variant="outlined"
            sx={{ width: "15rem", height: "3.5rem", marginLeft: "5rem", color: "black", borderColor: "black" }}
          >
            <Link href="/host/create-session">
              <a>
                Create a session
              </a>
            </Link>
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "5rem", marginLeft: "5rem", width: "90%" }}>
          <Table >
            <TableHead sx={{ backgroundColor: "#4F3398" }}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff" }}>Combos</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Sold</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Gross</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Session Price</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Ticket Discount</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff", paddingRight: "3rem" }}>Number of Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props?.data?.map((row) => (
                <TableRow key={row?.comboSessionId} sx={{ width: "100%" }}>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontWeight: "bold" }}>{row?.comboSessionName}</Typography>
                  </TableCell>
                  <TableCell align="right">{totalPrice?.data?.totalComboSell}</TableCell>
                  <TableCell align="right">{totalPrice?.data?.totalPrice} VNĐ</TableCell>
                  <TableCell align="right">{splitNum(getTotalPrice(row?.conferenceList))} VNĐ</TableCell>
                  <TableCell align="right">{row?.discount}%</TableCell>
                  <TableCell align="right" sx={{ width: "15rem" }}>
                    {row?.conferenceList?.length}
                    <SessionMenu event={row} />
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
