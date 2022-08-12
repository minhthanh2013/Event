import React, { useEffect, useState, useContext } from "react";
import styles from "../../../styles/CreateEventForm.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import EventNoteIcon from '@mui/icons-material/EventNote';
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

type Data = {
  [key: string]: any;
}
interface CreateEventProps {
  data: Data;
  setData: (data: object) => void;
  setValue: (value: number) => void;
  api: (data: object) => void;
  prop: any;
}


export const BasicInfo: React.FC<CreateEventProps> = ({ data, setData, setValue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (value: any) => {
    setData({
      ...data, sessionName: value.sessionName, organizerName: value.organizerName,
      organizerEmail: value.organizerEmail, totalPrice: value.totalPrice, sessionDescription: value.sessionDescription
    });
    setValue(1);
  };
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
            label="Session Name"
            defaultValue={data.conferenceName}
            variant="standard"
            {...register("sessionName")}
          />
          <TextField
            className={styles.eventFields}
            id="standard-required"
            label="Organizer Name"
            required
            defaultValue={data ? data.organizerName : undefined}
            variant="standard"
            {...register("organizerName")}
          />
          <TextField
            className={styles.eventFields}
            id="standard-required"
            label="Organizer Email"
            required
            type="email"
            defaultValue={data ? data.organizerName : undefined}
            variant="standard"
            {...register("organizerEmail")}
          />
          <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Total price"
            variant="standard"
            defaultValue={data.totalPrice}
            type="number"
            {...register("totalPrice")}
          />
          <TextField
            className={styles.eventFields}
            label="Description"
            multiline
            {...register("sessionDescription")}
          />
          <Button className={styles.nextBtn} variant="contained" type="submit">
            Next
          </Button>
        </form>
      </Grid>
    </>
  );
};

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

interface ConferenceProps {
  status: boolean;
  data: ConferenceProp[];
}

export const Conferences: React.FC<CreateEventProps> = ({ data, setData, setValue, api, prop }) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  const [conferences, setConferences] = useState<ConferenceProps>();
  const [checked, setChecked] = React.useState([0]);

  useEffect(() => {
    const fetchConferences = async () => {
      const dataResult = await fetch('/api/conference/get-conference-by-host-id/' + prop.tempDecode.sub);
      const cateResult = await dataResult.json();
      setConferences(cateResult)
    }

    fetchConferences();
  }, [])

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const onSubmit = (value: any) => {
    let temp = [...(data.conferenceList ?? [])];
    temp.push(value);
    setData({ ...data, conferenceList: temp })
    setOpen(false);
  };

  const onFinish = () => {
    setValue(0)
    api({ ...data, hostName: prop.tempDecode.username });
  }
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
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
                Add Conference
              </Typography>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {[0, 1, 2, 3].map((value) => {
                  const labelId = `checkbox-list-label-${value}`;

                  return (
                    <ListItem
                      key={value}
                      disablePadding
                    >
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
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
    let temp: ConferenceProps[] = [];
    let arr: ConferenceProps[] = [];
    data.speakerList?.forEach((conference) => temp.push(Object.assign({}, conference)));
    data.speakerList !== undefined ? (arr = temp.splice(index, 1)) : (temp = []);
    setData({ ...data, conferenceList: temp })
  };

  return (
    <>
      {data.conferenceList?.length === undefined || data.conferenceList?.length < 1 ? (
        <Grid container spacing={0} direction="column" alignItems="center">
          <EventNoteIcon
            className={styles.speakersIcon}
            sx={{ fontSize: 90 }}
            color="primary"
          />
          <Typography align="center">
            Oops! This session does not have any conference yet. Please add some more!
          </Typography>
          <Button
            className={styles.inviteBtn}
            variant="contained"
            onClick={handleOpen}
          >
            Add Conference into your session
          </Button>
          <Popup />
        </Grid>
      ) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          {data.conferenceList?.map((conference, index) => (
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
                  {conference.id}
                </Typography>
              </Alert>
            </>
          ))}
          <Box sx={{ marginTop: "2px", width: "80%", alignSelf: "center" }}>
            <Button
              sx={{ width: "12rem" }}
              variant="outlined"
              onClick={handleOpen}
            >
              Add Conference
            </Button>
            <Button
              sx={{ width: "12rem", float: "right" }}
              variant="contained"
              onClick={onFinish}
            >
              Submit
            </Button>
          </Box>
          <Popup />
        </Stack>
      )}
    </>
  );
};

