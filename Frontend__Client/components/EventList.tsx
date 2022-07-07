import {useState} from "react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import styles from "../styles/CreateEventForm.module.scss";

export const EventList = () => {
    const types = {
        lastest: 'Latest',
        sold: 'Sold',
        published: 'Published',
      };
    const [sortType, setSortType] = useState('lastest');

    return (
        <>
        <Box sx={{ marginLeft: "0" }}>
        <Typography variant="h3" component="div" sx={{ marginLeft: "0"}}>
          Events
        </Typography>
        <Box sx={{ marginRight: "5rem", float: "right" }}>
          <FormControl sx={{width: "15rem"}}>
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
                sx={{ width: "15rem", height:"3.5rem" , marginLeft: "5rem", color:"black", borderColor:"black" }}
            >
                Create an event
            </Button>
        </Box>
        <Box sx={{clear:"both", margin: "3rem 5rem 0 0", width: "100%", height: "3rem", backgroundColor: "#4F3398" }}>
            <Typography sx={{color: "#ffffff"}}>Events</Typography>
        </Box>
      </Box>
        </>
    )
}
