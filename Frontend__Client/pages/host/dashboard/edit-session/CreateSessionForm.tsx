import React, { useEffect, useState, useContext } from "react";
import styles from "../../../../styles/CreateEventForm.module.scss";
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
  console.log(35, data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (value: any) => {
    setData({
      ...data, comboSessionName: value.comboSessionName, discount: value.discount, comboSessionDescription: value.comboSessionDescription
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
          {data.comboSessionName && <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Session Name"
            defaultValue={data.comboSessionName}
            variant="standard"
            {...register("comboSessionName")}
          />}
          {data.discount && <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Session Discount"
            variant="standard"
            defaultValue={data.discount}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            {...register("discount")}
          />}
          {data.comboSessionDescription && <TextField
            className={styles.eventFields}
            label="Description"
            defaultValue={data.comboSessionDescription}
            multiline
            {...register("comboSessionDescription")}
          />}
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
  const [checked, setChecked] = React.useState([]);

  useEffect(() => {
    const fetchConferences = async () => {
      const dataResult = await fetch('/api/conference/get-conference-by-host-id/1');
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
    const result = conferences?.data.filter(
      event => {
        if (checked.includes(event.conference_id)) {
          return true;
        }
        return false;
      }
    )

    setData({ ...data, conferenceList: result })
    setOpen(false);
  };

  const onFinish = () => {
    setValue(0)
    api({ ...data, hostName: prop.tempDecode.username });
    //chỉnh lại API
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
                Choose your Conference
              </Typography>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {conferences?.data.map((conference) => {
                  return (
                    <>
                      {conference.status_ticket === 'published' &&
                        <ListItem
                          key={conference.conference_id}
                          disablePadding
                          className={styles.sketchy}
                        >
                          <ListItemButton role={undefined} onClick={handleToggle(conference.conference_id)} dense>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={checked.indexOf(conference.conference_id) !== -1}
                                tabIndex={-1}
                                disableRipple
                              />
                            </ListItemIcon>
                            <ListItemText id={conference.conference_id.toString()} primary={`${conference.conference_name}`} secondary={`Price: ${conference.price}`} />
                          </ListItemButton>
                        </ListItem>}
                    </>
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

  const Total = data.conferenceList?.reduce((result, item) => {
    let a = item.price;
    if (typeof item.price === 'string') {
      a = parseInt(item.price)
    } return result + a
  }, 0);

  const Discount = Total - Total * data.discount / 100;
  console.log(Discount)
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
            Add Conference to your session
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
              >
                <Typography
                  className={styles.eventInfo}
                  sx={{ fontWeight: "bold", fontSize: "1rem" }}
                >
                  Conference: {conference.conference_name} <br />
                  Start date: {conference.date_start_conference} <br />
                  Price: {conference.price}
                </Typography>
              </Alert>
            </>
          ))}
          <TextField
            label="Total conference price"
            disabled
            value={Total}
            className={styles.totalPrice}
          />
          <TextField
            label="After discount price"
            disabled
            value={Discount}
            className={styles.totalPrice}
          />
          <Box sx={{ marginTop: "2px", width: "80%", alignSelf: "center" }}>
            <Button
              sx={{ width: "12rem" }}
              variant="outlined"
              onClick={handleOpen}
            >
              Select Conference
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

