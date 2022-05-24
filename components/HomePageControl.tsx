import React from "react";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface TicketListProps {}

const options = [
  { label: "Current", id: 1 },
  { label: "Pulp Fiction", id: 2 },
  { label: "Pulp Fiction 3", id: 3 },
];

const currentOptions = [
  { label: "Current Event", id: 1 },
  { label: "Pass Event", id: 2 },
  { label: "Future Event", id: 3 },
];

const TicketList = (props: TicketListProps) => {
  const [dateOption, setDateOption] = React.useState("");
  const [typeOption, setTypeOption] = React.useState("");
  const [categoryOption, setCategoryOption] = React.useState("");
  const [openDateForm, setOpenDateForm] = React.useState(false);
  const [openTypeForm, setOpenTypeForm] = React.useState(false);
  const [openCategoryForm, setOpenCategoryForm] = React.useState(false);

  const handleChangeDateForm = (event: any) => {
    setDateOption(event.target.value);
  };
  const handleCloseDateForm = () => {
    setOpenDateForm(false);
  };

  const handleOpenDateForm = () => {
    setOpenDateForm(true);
  };

  const handleChangeTypeForm = (event: any) => {
    setTypeOption(event.target.value);
  };
  const handleCloseTypeForm = () => {
    setOpenTypeForm(false);
  };

  const handleOpenTypeForm = () => {
    setOpenTypeForm(true);
  };

  const handleChangeCategoryForm = (event: any) => {
    setCategoryOption(event.target.value);
  };
  const handleCloseCategoryForm = () => {
    setOpenCategoryForm(false);
  };

  const handleOpenCategoryForm = () => {
    setOpenCategoryForm(true);
  };

  return (
    <>
      <Box sx={{ mt: "170px", width: "100%" }}>
        <Box sx={{ width: "80%", mx: "auto", display: "flex" }}>
          <Typography
            component="h2"
            sx={{
              fontSize: "2.1rem",
              fontWeight: "700",
              alignSelf: "center",
              mr: "100px",
            }}
            flexShrink={0}
          >
            Upcoming Events
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "100px",
              "& > div *": {
                borderColor: "#6A35F2",
                color: "#6A35F2",
                fontWeight: "500",
              },
              "& > div label": { color: "#6A35F2", fontWeight: "500" },
              "& > div .MuiInputBase-input": {
                color: "#6A35F2",
                fontWeight: "500",
              },
            }}
          >
            {/*Date Form*/}
            <FormControl
              sx={{
                m: 1,
                width: 250,
              }}
            >
              <InputLabel id="date-controlled-open-select-label">
                Current
              </InputLabel>
              <Select
                labelId="date-controlled-open-select-label"
                id="date-controlled-open-select"
                open={openDateForm}
                onClose={handleCloseDateForm}
                onOpen={handleOpenDateForm}
                value={dateOption}
                label="Current"
                onChange={handleChangeDateForm}
              >
                {currentOptions.map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/*Type Form*/}
            <FormControl sx={{ m: 1, width: 250 }}>
              <InputLabel id="type-controlled-open-select-label">
                Event Type
              </InputLabel>
              <Select
                labelId="type-controlled-open-select-label"
                id="type-controlled-open-select"
                open={openTypeForm}
                onClose={handleCloseTypeForm}
                onOpen={handleOpenTypeForm}
                value={typeOption}
                label="Event Type"
                onChange={handleChangeTypeForm}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/*Category Form*/}
            <FormControl sx={{ m: 1, width: "30%" }}>
              <InputLabel id="category-controlled-open-select-label">
                Category
              </InputLabel>
              <Select
                labelId="category-controlled-open-select-label"
                id="category-controlled-open-select"
                open={openCategoryForm}
                onClose={handleCloseCategoryForm}
                onOpen={handleOpenCategoryForm}
                value={categoryOption}
                label="Category"
                onChange={handleChangeCategoryForm}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TicketList;
