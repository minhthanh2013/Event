import React, { useState } from "react";
import styles from "../styles/CreateEventForm.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const BasicInfo = () => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Grid
        className={styles.formGrid}
        container
        spacing={0}
        direction="column"
        alignItems="center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Event Name"
            variant="standard"
            {...register("eventName")}
          />
          <TextField
            className={styles.eventFields}
            id="standard-required"
            label="Organizer Name"
            variant="standard"
            {...register("organizerName")}
          />

          <FormControl className={styles.select}>
            <InputLabel id="select-type">Type</InputLabel>
            <Select
              className={styles.selectType}
              required
              labelId="select-type"
              value={type}
              label="Type"
              {...register("type")}
              onChange={handleChangeType}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={styles.select} style={{ marginRight: "0" }}>
            <InputLabel id="select-category">Category</InputLabel>
            <Select
              required
              labelId="select-category"
              value={category}
              label="Category"
              {...register("category")}
              onChange={handleChangeCategory}
            >
              <MenuItem value={"music"}>Music</MenuItem>
              <MenuItem value={"talkShow"}>Talk Show</MenuItem>
              <MenuItem value={"event"}>Event</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className={styles.eventFields}
            label="Description"
            multiline
            {...register("Description")}
          />
          <Button className={styles.nextBtn} variant="contained" type="submit">
            Next
          </Button>
        </form>
      </Grid>
    </>
  );
};

interface Speaker {
  email: string;
  name: string;
}

export const Speakers = () => {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm();
  const [speakers, setSpeakers] = useState<Speaker[]>();

  const onSubmit = (data: any) => {
    let temp = [...(speakers ?? [])];
    temp.push(data);
    setSpeakers(temp);
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    resetField("email");
    resetField("name");
  };
  const Popup = () => {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-describedby="speakers-details"
        >
          <Box className={styles.popup}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                component="h2"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Add Speaker
              </Typography>
              <TextField
                className={styles.eventFields}
                required
                id="standard-required"
                type="email"
                label="Email"
                variant="standard"
                {...register("email")}
              />
              <TextField
                className={styles.eventFields}
                required
                id="standard-required"
                label="Display Name"
                variant="standard"
                {...register("name")}
              />
              <Button
                className={styles.inviteBtn}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      </>
    );
  };

  const handleDelete = (index: number) => {
    let temp: Speaker[] = [];
    let arr: Speaker[] = [];
    speakers?.forEach((speaker) => temp.push(Object.assign({}, speaker)));
    speakers !== undefined ? (arr = temp.splice(index, 1)) : (temp = []);
    console.log(temp);
    console.log(index);
    setSpeakers(temp);
  };

  return (
    <>
      {speakers?.length === undefined ? (
        <Grid container spacing={0} direction="column" alignItems="center">
          <InterpreterModeIcon
            className={styles.speakersIcon}
            sx={{ fontSize: 90 }}
            color="primary"
          />
          <Typography align="center">
            Get exciting speakers on board. Fill out their bio so that the
            microsite user can learn about them.
          </Typography>
          <Button
            className={styles.inviteBtn}
            variant="contained"
            onClick={handleOpen}
          >
            Invite Spreakers
          </Button>
          <Popup />
        </Grid>
      ) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          {speakers?.map((speaker, index) => (
            <>
              <Alert
                key={index}
                severity="success"
                icon={false}
                className={styles.infoBox}
                action={
                  <IconButton
                    className={styles.closeBtn}
                    aria-label="delete"
                    color="primary"
                    size="large"
                    onClick={() => handleDelete(index)}
                  >
                    <CancelIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                <Typography
                  className={styles.speakersInfo}
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                >
                  {speaker.email}
                </Typography>
                <Typography className={styles.speakersInfo}>
                  {speaker.name}
                </Typography>
              </Alert>
            </>
          ))}
          <Button
            className={styles.inviteBtn}
            variant="outlined"
            onClick={handleOpen}
          >
            Add Spreakers
          </Button>
          <Popup />
        </Stack>
      )}
    </>
  );
};

export const Date = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState<Date | null>(null);
  const [value2, setValue2] = useState<Date | null>(null);
  const [value3, setValue3] = useState<Date | null>(null);
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Grid
        className={styles.formGrid}
        container
        spacing={0}
        direction="column"
        alignItems="center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DatePicker
                label="Event start date"
                inputFormat="dd/MM/yyyy"
                value={value}
                disablePast
                onChange={(newValue: Date | null) => {
                  setValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    className={styles.dateFields}
                    required
                    {...params}
                    {...register("eventStart")}
                  />
                )}
              />
              <DatePicker
                label="Ticket sales start"
                inputFormat="dd/MM/yyyy"
                value={value2}
                disablePast
                onChange={(newValue: Date | null) => {
                  setValue2(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    className={styles.dateFields}
                    required
                    {...params}
                    {...register("ticketStart")}
                  />
                )}
              />
              <DatePicker
                label="Ticket sales end"
                inputFormat="dd/MM/yyyy"
                value={value3}
                disablePast
                onChange={(newValue: Date | null) => {
                  setValue3(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    className={styles.dateFields}
                    required
                    {...params}
                    value={value3}
                    {...register("ticketEnd")}
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>

          <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Ticket price"
            variant="standard"
            type="number"
            {...register("price")}
          />
          <TextField
            className={styles.eventFields}
            disabled
            id="standard-required"
            label="Ticket quantity"
            variant="standard"
            value="100"
          />
          <Button className={styles.nextBtn} variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Grid>
    </>
  );
};
