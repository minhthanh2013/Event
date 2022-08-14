import React, { useEffect, useState } from "react";
import styles from "../../../../styles/CreateEventForm.module.scss";
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
  api: (data: object) => void;
  prop: any;
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
  console.log(data);
  const defaultData = data;
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
    // nếu nó tạo thừa field thì xóa ...data đi
    setData({
      ...data, conference_name: value.conference_name, organizerName: value.organizerName,
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
          <>
        {data.conference_name && <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Event Name"
            defaultValue={data.conference_name}
            variant="standard"
            {...register("conference_name")}
          />}
          {data.organizer_name && <TextField
            className={styles.eventFields}
            id="standard-required"
            label="Organizer Name"
            defaultValue={data.organizer_name}
            variant="standard"
            {...register("organizer_name")}
          />}

          {data.conference_type && <FormControl className={styles.select}>
            <InputLabel id="select-type">Type</InputLabel>
            <Select
              className={styles.selectType}
              required
              labelId="select-type"
              defaultValue={data.conference_type}
              label="Type"
              {...register("conference_type")}
            >
              {typeList?.data?.map((dataItem) => (
                <MenuItem key={dataItem.type_id} value={dataItem.type_id}>{dataItem.type_name}</MenuItem>
              ))}
            </Select>
          </FormControl>}

          {data.conference_category && <FormControl className={styles.select} style={{ marginRight: "0" }}>
            <InputLabel id="select-category">Category</InputLabel>
            <Select
              required
              labelId="select-category"
              defaultValue={data.conference_category}
              label="Category"
              {...register("conference_category")}
            >
              {categoryList?.data?.map((dataItem) => (
                <MenuItem key={dataItem.category_id} value={dataItem.category_id}>{dataItem.category_name}</MenuItem>
              ))}
            </Select>
          </FormControl>}

          { data.description && <TextField
            className={styles.eventFields}
            label="Description"
            defaultValue={data.description}
            multiline
            {...register("conferenceDescription")}
          />}

          <Button className={styles.nextBtn} variant="contained" type="submit">
            Next
          </Button>
          </>
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

export const Date: React.FC<CreateEventProps> = ({ data, setData, setValue, api, prop }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  const [eventStart, setEventStart] = useState<Date | null>(null);
  const [ticketStart, setTicketStart] = useState<Date | null>(null);
  const [ticketEnd, setTicketEnd] = useState<Date | null>(null);

  const onSubmit = (value: any) => {
    api({ ...data, date_start_conference: value.date_start_conference, date_start_sell: value.date_start_sell,
      date_end_sell: value.date_end_sell, price: value.price, ticket_quantity: value.ticket_quantity, hostName: prop.tempDecode.username });
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
                name="dateStartConference"
                control={control}
                defaultValue={data?.date_start_conference}
                render={({ field: { ref, ...rest } }) => (
                  <DatePicker
                    label="Event start date"
                    inputFormat="dd/MM/yyyy"
                    value={data.date_start_conference}
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
                defaultValue={data?.date_start_sell}
                render={({ field: { ref, ...rest } }) => (
                  <DatePicker
                    label="Ticket sales start"
                    inputFormat="dd/MM/yyyy"
                    value={data.date_start_sell}
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
                defaultValue={data?.dateEndSell} 
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

          {data.price && <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Ticket price"
            variant="standard"
            defaultValue={data.price}
            value={data?.price || ''}
            type="number"
            {...register("price")}
          />}
          {data.ticket_quantity && <TextField
            className={styles.eventFields}
            required
            id="standard-required"
            label="Ticket quantity"
            variant="standard"
            type="number"
            defaultValue={data.ticket_quantity}
            value={data?.ticket_quantity || ''}
            {...register("ticket_quantity")}
          />}
          <Button className={styles.nextBtn} variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Grid>
    </>
  );
};
