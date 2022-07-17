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

export const Sessions = () => {
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

  const rows = [
    createData('Concert: Ensemble of Nature', 56, 3.7, 2),
    createData('Music Show: Son Tung MTP Live Show', 305, 5, 3),
    createData('Workshop: How to use pencil', 88, 3.565, 1),
    createData('Concert: ABCD', 45, 3.612, 8),
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
              <MenuItem value="lastest">Latest</MenuItem>
              <MenuItem value="sold">Sold</MenuItem>
              <MenuItem value="published">Published</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            sx={{ width: "15rem", height: "3.5rem", marginLeft: "5rem", color: "black", borderColor: "black" }}
          >
            <Link href="/CreateSession">
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
                <TableCell sx={{ color: "#ffffff" }}>Events</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Sold</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff" }}>Gross</TableCell>
                <TableCell align="right" sx={{ color: "#ffffff", paddingRight: "3rem" }}>Number of Event</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ width: "100%" }}>
                  <TableCell component="th" scope="row">
                    <Typography sx={{ fontWeight: "bold" }}>{row.name}</Typography>
                  </TableCell>
                  <TableCell align="right">{row.sold}/100</TableCell>
                  <TableCell align="right">${row.gross}</TableCell>
                  <TableCell align="right" sx={{ width: "15rem" }}>
                    {row.numOfEvent}
                    <IconButton sx={{ color: "rgba(106, 53, 242, 0.77)", marginLeft: "2rem"}} onClick={handleClick}>
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>View</MenuItem>
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>Publish</MenuItem>
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
