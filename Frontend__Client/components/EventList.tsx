import { useState } from "react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "../styles/CreateEventForm.module.scss";

export const EventList = () => {
  const types = {
    lastest: 'Latest',
    sold: 'Sold',
    published: 'Published',
  };
  const [sortType, setSortType] = useState('lastest');

  interface Data {
    name: string;
    sold: number;
    gross: number;
    date: string;
    status: string;
  }

  function createData(
    name: string,
    sold: number,
    gross: number,
    date: string,
    status: string,
  ): Data {
    return {
      name,
      sold,
      gross,
      date,
      status
    };
  }

  const rows = [
    createData('Concert: Ensemble of Nature', 56, 3.7, '7/7/2022','draft'),
    createData('Music Show: Son Tung MTP Live Show', 305, 5, '15/7/2022','pending'),
    createData('Workshop: How to use pencil', 88, 3.565, '22/7/2022','published'),
    createData('Concert: ABCD', 45, 3.612, '5/7/2022','ended'),
  ];

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
            Create an event
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "5rem", marginLeft: "5rem", width: "90%"}}>
          <Table >
            <TableHead sx={{ backgroundColor: "#4F3398"}}>
              <TableRow>
                <TableCell sx={{ color: "#ffffff" }}>Events</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Sold</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Gross</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ width: "100%" }}>
                  <TableCell component="th" scope="row">
                    <Typography sx={{fontWeight: "bold"}}>{row.name}</Typography>
                    online event <br />
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.sold}/100</TableCell>
                  <TableCell align="right">${row.gross}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
