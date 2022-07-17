import React, { useEffect, useState } from "react";
import styles from "../../styles/CreateEventForm.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
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
type Data = {
  [key: string]: any;
}
interface CreateEventProps {
  data: Data;
  setData: (data: object) => void;
  setValue: (value: number) => void;
}
interface PropsArray {
  id: number,
  name: string,
}
interface Props {
  status: boolean,
  data: PropsArray[],
}
export const BasicInfo: React.FC<CreateEventProps> = ({ data, setData, setValue }) => {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState<Props>()
  const [typeList, setTypeList] = useState<Props>()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getDataCategory();
  }, []);

  useEffect(() => {
    getDataType();
  }, []);

  const getDataCategory = async () => {
    let res = await fetch("http://localhost:3000/conferencecategory/get-all")
    let categoryData = await res.json()
    setCategoryList(categoryData)
  }
  const getDataType = async () => {
    let res = await fetch("http://localhost:3000/conferencetype/get-all")
    let typeData = await res.json()
    setTypeList(typeData)
  }

  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const onSubmit = (value: any) => {
    setData({
      ...data, eventName: value.eventName, organizerName: value.organizerName,
      eventType: value.type, eventCategory: value.category, description: value.description
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
            defaultValue={data ? data.eventName : undefined}
            variant="standard"
            {...register("eventName")}
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
              defaultValue={data.type}
              label="Type"
              {...register("type")}
              onChange={handleChangeType}
            >
              {typeList?.data.map((typeItem) => (
                <MenuItem value={typeItem.name} key={typeItem.id}>aiusfhaisufh: + {typeItem.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={styles.select} style={{ marginRight: "0" }}>
            <InputLabel id="select-category">Category</InputLabel>
            <Select
              required
              labelId="select-category"
              defaultValue={data ? data.category : category}
              label="Category"
              {...register("category")}
              onChange={handleChangeCategory}
            >
              {categoryList?.data.map(cateItem => (
                <MenuItem value={cateItem.name}>{cateItem.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            className={styles.eventFields}
            label="Description"
            defaultValue={data ? data.description : undefined}
            multiline
            {...register("description")}
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
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (value: any) => {
    let temp = [...(data.speakers ?? [])];
    temp.push(value);
    setData({ ...data, speakers: temp })
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
    data.speakers?.forEach((speaker) => temp.push(Object.assign({}, speaker)));
    data.speakers !== undefined ? (arr = temp.splice(index, 1)) : (temp = []);
    setData({ ...data, speakers: temp })
  };

  return (
    <>
      {data.speakers?.length === undefined || data.speakers?.length < 1 ? (
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
          {data.speakers?.map((speaker, index) => (
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

export const Date: React.FC<CreateEventProps> = ({ data, setData, setValue }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control
  } = useForm();

  const [eventStart, setEventStart] = useState<Date | null>(null);
  const [ticketStart, setTicketStart] = useState<Date | null>(null);
  const [ticketEnd, setTicketEnd] = useState<Date | null>(null);
  const onSubmit = (value: any) => {
    setData({
      ...data, eventStart: value.eventStart, ticketStart: value.ticketStart,
      ticketEnd: value.ticketEnd, price: value.price, quantity: value.quantity
    });
    setValue(0);
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
                name="eventStart"
                control={control}
                defaultValue={data.eventStart}
                render={({ field: { ref, ...rest } }) => (
                  <DatePicker
                    label="Event start date"
                    inputFormat="dd/MM/yyyy"
                    value={data.eventStart}
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
                name="ticketStart"
                control={control}
                defaultValue={data.ticketStart}
                render={({ field: { ref, ...rest } }) => (
                  <DatePicker
                    label="Ticket sales start"
                    inputFormat="dd/MM/yyyy"
                    value={data.ticketStart}
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
                name="ticketEnd"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <DatePicker
                    label="Ticket sales end"
                    inputFormat="dd/MM/yyyy"
                    value={data.ticketEnd}
                    disablePast
                    minDate={data.ticketStart}
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
            defaultValue={data.price}
            type="number"
            {...register("price")}
          />
          <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Ticket quantity"
            variant="standard"
            type="number"
            defaultValue={data.quantity}
            {...register("quantity")}
          />
          <Button className={styles.nextBtn} variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Grid>
    </>
  );
};
