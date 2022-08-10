import React, { useEffect, useState } from "react";
import styles from "../../../styles/CreateEventForm.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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
type Data = {
  [key: string]: any;
}
interface CreateEventProps {
  data: Data;
  setData: (data: object) => void;
  setValue: (value: number) => void;
<<<<<<< HEAD
  api: (data: object) => void;
=======
  prop: any
>>>>>>> 6fdffc72dbf221d44cad56aa1e88d838c3f8dcbe
}

interface TypeProps {
  status: boolean;
  data: TypeProps[];
}

interface CategoryProps {
  status: boolean;
  data: CategoryProps[];
}

interface TypeProps {
  type_id: number;
  type_name: string;
}

interface CategoryProps {
  category_id: number;
  category_name: string;
}

export const BasicInfo: React.FC<CreateEventProps> = ({ data, setData, setValue }) => {
  const [categoryList, setCategoryList] = useState<CategoryProps>()
  const [typeList, setTypeList] = useState<TypeProps>()

  useEffect(() => {
    const fetchDataCate = async () => {
      const dataResult = await fetch("/api/conference-category/get-all");
      const cateResult = await dataResult.json();
      setCategoryList(cateResult)
    }
    const fetchDataType = async () => {
      const dataResult = await fetch("/api/conference-type/get-all");
      const typeResult = await dataResult.json();
      setTypeList(typeResult)
    }

    fetchDataType();
    fetchDataCate();
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (value: any) => {
    setData({
      ...data, conferenceName: value.conferenceName, organizerName: value.organizerName,
      conferenceType: value.conferenceType, conferenceCategory: value.conferenceCategory, conferenceDescription: value.conferenceDescription
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
            label="Event Name"
            defaultValue={data.conferenceName}
            variant="standard"
            {...register("conferenceName")}
          />
          <TextField
            className={styles.eventFields}
            id="standard-required"
            label="Organizer Name"
            defaultValue={data ? data.organizerName : undefined}
            variant="standard"
            {...register("organizerName")}
          />

          <FormControl className={styles.select}>
            <InputLabel id="select-type">Type</InputLabel>
            <Select
              className={styles.selectType}
              required
              labelId="select-type"
              defaultValue={data.conferenceType}
              label="Type"
              {...register("conferenceType")}
            >
              {typeList?.data?.map((dataItem) => (
                <MenuItem key={dataItem.type_id} value={dataItem.type_id}>{dataItem.type_name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={styles.select} style={{ marginRight: "0" }}>
            <InputLabel id="select-category">Category</InputLabel>
            <Select
              required
              labelId="select-category"
              defaultValue={data.conferenceCategory}
              label="Category"
              {...register("conferenceCategory")}
            >
              {categoryList?.data?.map((dataItem) => (
                <MenuItem key={dataItem.category_id} value={dataItem.category_id}>{dataItem.category_name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            className={styles.eventFields}
            label="Description"
            defaultValue={data.conferenceDescription}
            multiline
            {...register("conferenceDescription")}
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

export const Speakers: React.FC<CreateEventProps> = ({ data, setData, setValue }) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const onSubmit = (value: any) => {
    let temp = [...(data.speakerList ?? [])];
    temp.push(value);
    setData({ ...data, speakerList: temp })
    setOpen(false);
  };

  const onFinish = () => {
    setValue(2)
  }
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
    data.speakerList?.forEach((speaker) => temp.push(Object.assign({}, speaker)));
    data.speakerList !== undefined ? (arr = temp.splice(index, 1)) : (temp = []);
    setData({ ...data, speakerList: temp })
  };

  return (
    <>
      {data.speakerList?.length === undefined || data.speakerList?.length < 1 ? (
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
            {data.speakerList?.map((speaker, index) => (
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
          <Box sx={{ marginTop: "2px", width: "80%", alignSelf: "center" }}>
            <Button
              sx={{ width: "12rem" }}
              variant="outlined"
              onClick={handleOpen}
            >
              Add Spreakers
            </Button>
            <Button
              sx={{ width: "12rem", float: "right" }}
              variant="contained"
              onClick={onFinish}
            >
              Next
            </Button>
          </Box>
          <Popup />
        </Stack>
      )}
    </>
  );
};

<<<<<<< HEAD
export const Date: React.FC<CreateEventProps> = ({ data, setData, setValue, api }) => {
=======
export const Date: React.FC<CreateEventProps> = ({ data, setData, setValue, prop }) => {
>>>>>>> 6fdffc72dbf221d44cad56aa1e88d838c3f8dcbe
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  const [eventStart, setEventStart] = useState<Date | null>(null);
  const [ticketStart, setTicketStart] = useState<Date | null>(null);
  const [ticketEnd, setTicketEnd] = useState<Date | null>(null);
<<<<<<< HEAD
  
=======
  const apiCall = async (data) => {
    const res = await fetch("/api/conference/create-new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
  }
>>>>>>> 6fdffc72dbf221d44cad56aa1e88d838c3f8dcbe
  const onSubmit = (value: any) => {
    setData({
      ...data, dateStartConference: value.dateStartConference, dateStartSell: value.dateStartSell,
      dateEndSell: value.dateEndSell, conferencePrice: value.conferencePrice, ticketQuantity: value.ticketQuantity
    });
<<<<<<< HEAD
=======
    apiCall({ ...data, hostName: prop.tempDecode.username });
>>>>>>> 6fdffc72dbf221d44cad56aa1e88d838c3f8dcbe
    setValue(0);
    api({ ...data, hostName: "minhthanh1" });
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <Controller
                name="dateStartConference"
                control={control}
                defaultValue={data.dateStartConference}
                render={({ field: { ref, ...rest } }) => (
                  <DatePicker
                    label="Event start date"
                    inputFormat="dd/MM/yyyy"
                    value={data.dateStartConference}
                    disablePast
                    inputRef={ref}
                    onChange={(newValue: Date | null) => {
                      setEventStart(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={styles.dateFields}
                        required
                        {...params}
                      />
                    )}
                    {...rest}
                  />
                )}
              />
              <Controller
                name="dateStartSell"
                control={control}
                defaultValue={data.dateStartSell}
                render={({ field: { ref, ...rest } }) => (
                  <DatePicker
                    label="Ticket sales start"
                    inputFormat="dd/MM/yyyy"
                    value={data.dateStartSell}
                    disablePast
                    inputRef={ref}
                    onChange={(newValue: Date | null) => {
                      setTicketStart(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={styles.dateFields}
                        required
                        {...params}
                      />
                    )}
                    {...rest}
                  />
                )}
              />
              <Controller
                name="dateEndSell"
                control={control}
                defaultValue={data.dateEndSell} 
                render={({ field: { ref, ...rest } }) => (
                  <DatePicker
                    label="Ticket sales end"
                    inputFormat="dd/MM/yyyy"
                    value={data.dateEndSell}
                    disablePast
                    inputRef={ref}
                    onChange={(newValue: Date | null) => {
                      setTicketEnd(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={styles.dateFields}
                        required
                        {...params}
                      />
                    )}
                    {...rest}
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
            defaultValue={data.conferencePrice}
            type="number"
            {...register("conferencePrice")}
          />
          <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Ticket quantity"
            variant="standard"
            type="number"
            defaultValue={data.ticketQuantity}
            {...register("ticketQuantity")}
          />
          <Button className={styles.nextBtn} variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Grid>
    </>
  );
};
